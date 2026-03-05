#!/bin/bash
# VPS Master Deployment Script for JMS Ocean Central Server
# Run as root: curl -sL https://raw.githubusercontent.com/sanjay-541/jmsocean-central-server/main/scripts/vps-deploy.sh | bash

set -e

echo "==========================================================="
echo "   JMS Ocean Central Server - Production Deployment"
echo "==========================================================="

# --- Step 1: Secure Server First ---
echo "=> Step 1: Securing Server..."

# Ask for passwords interactively if not passed
read -s -p "Enter new ROOT password: " ROOT_PASS
echo ""
read -s -p "Enter password for new 'deploy' user: " DEPLOY_PASS
echo ""
read -s -p "Enter a secure DB password for PostgreSQL: " DB_PASS
echo ""

echo "root:$ROOT_PASS" | chpasswd

# Create deploy user
if ! id "deploy" &>/dev/null; then
    useradd -m -s /bin/bash deploy
    echo "deploy:$DEPLOY_PASS" | chpasswd
    usermod -aG sudo deploy
fi

# Disable root SSH login
sed -i 's/^PermitRootLogin.*/PermitRootLogin no/' /etc/ssh/sshd_config
sed -i 's/^#PermitRootLogin.*/PermitRootLogin no/' /etc/ssh/sshd_config
systemctl restart ssh || systemctl restart sshd

# Configure UFW
ufw --force reset
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable

# Update system & install fail2ban
apt update && DEBIAN_FRONTEND=noninteractive apt upgrade -y
apt install -y fail2ban curl git ufw nginx software-properties-common
systemctl enable fail2ban
systemctl start fail2ban

# --- Step 2: Install Required Stack (Docker & Certbot) ---
echo "=> Step 2: Installing Docker, Compose Plugin & Certbot..."
# Install Docker Engine natively
if ! command -v docker &> /dev/null; then
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add -
    add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" -y
    apt update
    apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
fi
usermod -aG docker deploy
systemctl enable docker
systemctl start docker

# Install Certbot
apt install -y certbot python3-certbot-nginx

# --- Step 3: Create Production Directory Structure ---
echo "=> Step 3: Creating Production Directory Structure..."
mkdir -p /opt/jpsms/app
mkdir -p /opt/jpsms/backups
mkdir -p /opt/jpsms/logs
mkdir -p /opt/jpsms/scripts
mkdir -p /opt/jpsms/nginx
chown -R deploy:deploy /opt/jpsms

# Clone GitHub Repo
if [ ! -d "/opt/jpsms/app/.git" ]; then
    su - deploy -c "git clone https://github.com/sanjay-541/jmsocean-central-server.git /opt/jpsms/app"
else
    su - deploy -c "cd /opt/jpsms/app && git pull origin main"
fi

# --- Step 4: Production Environment Config ---
echo "=> Step 4: Configuring .env.production..."
cat <<EOF > /opt/jpsms/app/.env.production
NODE_ENV=production
PORT=3000
DB_HOST=postgres
DB_USER=postgres
DB_PASSWORD=$DB_PASS
DB_NAME=jms
JWT_SECRET=$(openssl rand -hex 32)
EOF
chown deploy:deploy /opt/jpsms/app/.env.production

# Write docker-compose.yml modification to ensure internal port 3000 only and named volume
cat <<EOF > /opt/jpsms/app/docker-compose.yml
version: "3.9"
services:
  jms-app:
    build: .
    container_name: jms-app
    restart: always
    ports:
      - "127.0.0.1:3000:3000"
    depends_on:
      - postgres
    environment:
      DB_HOST: postgres
      DB_USER: postgres
      DB_PASSWORD: $DB_PASS
      DB_NAME: jms
      NODE_ENV: production
    volumes:
      - appdata:/app/uploads
    networks:
      - jms_network
  
  postgres:
    image: postgres:15-alpine
    container_name: jms-db
    restart: always
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: $DB_PASS
      POSTGRES_DB: jms
    volumes:
      - pgdata:/var/lib/postgresql/data
    networks:
      - jms_network

volumes:
  pgdata:
  appdata:

networks:
  jms_network:
    driver: bridge
EOF
chown deploy:deploy /opt/jpsms/app/docker-compose.yml

# --- Step 5: Build Clean Docker Image ---
echo "=> Step 5: Building Clean Docker Image (BuildKit)..."
export DOCKER_BUILDKIT=1
export COMPOSE_DOCKER_CLI_BUILD=1
su - deploy -c "cd /opt/jpsms/app && docker compose build --no-cache"
su - deploy -c "cd /opt/jpsms/app && docker compose up -d"

# --- Step 6: Configure Nginx Reverse Proxy ---
echo "=> Step 6: Configuring Nginx Reverse Proxy..."
cat <<'EOF' > /etc/nginx/sites-available/jpsms
server {
    listen 80;
    server_name _;

    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-XSS-Protection "1; mode=block";
    add_header X-Content-Type-Options "nosniff";

    # GZIP
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # Max upload size
    client_max_body_size 50M;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
EOF
ln -sf /etc/nginx/sites-available/jpsms /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
systemctl restart nginx

# --- Step 7: Enable Auto Restart on Reboot ---
echo "=> Step 7: Enabling Systemd service for JMS..."
cat <<EOF > /etc/systemd/system/jpsms.service
[Unit]
Description=JPSMS Docker Compose Service
Requires=docker.service
After=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=/opt/jpsms/app
ExecStart=/usr/bin/docker compose up -d
ExecStop=/usr/bin/docker compose down
User=deploy

[Install]
WantedBy=multi-user.target
EOF
systemctl daemon-reload
systemctl enable jpsms.service

# --- Step 8: Automated Backup ---
echo "=> Step 8: Creating Automated Backup Script..."
cat <<'EOF' > /opt/jpsms/scripts/backup.sh
#!/bin/bash
docker exec jms-db pg_dump -U postgres jms > /opt/jpsms/backups/jpsms_$(date +%Y%m%d_%H%M%S).sql
find /opt/jpsms/backups -type f -name "*.sql" -mtime +7 -exec rm {} \;
EOF
chmod +x /opt/jpsms/scripts/backup.sh
chown deploy:deploy /opt/jpsms/scripts/backup.sh

# Add Cron job daily at 2AM
(crontab -l -u deploy 2>/dev/null | grep -v "backup.sh"; echo "0 2 * * * /opt/jpsms/scripts/backup.sh") | crontab -u deploy -

# --- Step 9: Deployment Update Script ---
echo "=> Step 9: Creating Deployment Update Script..."
cat <<'EOF' > /opt/jpsms/scripts/update.sh
#!/bin/bash
cd /opt/jpsms/app
git pull origin main
docker compose down
docker compose build --no-cache
docker compose up -d
EOF
chmod +x /opt/jpsms/scripts/update.sh
chown deploy:deploy /opt/jpsms/scripts/update.sh

echo "==========================================================="
echo "   DEPLOYMENT SUCCESSFUL! CENTRAL SERVER IS READY."
echo "==========================================================="
echo "- Running Containers: $(docker ps --format '{{.Names}}' | paste -sd, -)"
echo "- Open Ports:"
ufw status | grep ALLOW
echo "- Nginx Status: Active & Proxying to 3000"
echo "- Docker Version: $(docker --version)"
echo "- Backup Path: /opt/jpsms/backups/"
echo "- Update Command: su - deploy -c '/opt/jpsms/scripts/update.sh'"
echo "-----------------------------------------------------------"
echo "IMPORTANT:"
echo "Root SSH login is now disabled. Please reconnect using:"
echo "ssh deploy@<YOUR_SERVER_IP>"
echo "==========================================================="
