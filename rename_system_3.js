const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'PUBLIC');
const serverFile = path.join(__dirname, 'server.js');

const replacements = [
    { from: /AI Powered JPSMS/g, to: 'AI Powered JMS Ocean' },
    { from: /JPSMS server running/g, to: 'JMS Ocean server running' },
    { from: /document.title.replace\('JPSMS'/g, "document.title.replace('JMS Ocean'" }
];

function processFile(filePath) {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    replacements.forEach(r => {
        content = content.replace(r.from, r.to);
    });

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated: ${filePath}`);
    }
}

function walkDir(dir) {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walkDir(fullPath);
        } else if (fullPath.endsWith('.html') || fullPath.endsWith('.js')) {
            processFile(fullPath);
        }
    });
}

walkDir(publicDir);
processFile(serverFile);
console.log('Update 3 complete.');
