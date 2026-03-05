const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'PUBLIC');

const replacements = [
    { from: />JPSMS Vendor Portal/g, to: '>JMS Ocean Vendor Portal' },
    { from: />JPSMS Supervisor Portal/g, to: '>JMS Ocean Supervisor Portal' },
    { from: />JPSMS QC Portal/g, to: '>JMS Ocean QC Portal' },
    { from: />JPSMS Admin/g, to: '>JMS Ocean Admin' },
    { from: />JPSMS Schema/g, to: '>JMS Ocean Schema' },
    { from: />JMS Ocean - Dashboard/g, to: '>JMS Ocean Dashboard' }
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
console.log('Update 2 complete.');
