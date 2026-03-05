const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'PUBLIC');
const serverFile = path.join(__dirname, 'server.js');

const replacements = [
    { from: /<title>JPSMS - /g, to: '<title>JMS Ocean - ' },
    { from: />JPSMS - /g, to: '>JMS Ocean - ' },
    { from: />JPSMS</g, to: '>JMS Ocean<' },
    { from: /> JPSMS - /g, to: '> JMS Ocean - ' },
    { from: /"JPSMS"/g, to: '"JMS Ocean"' },
    { from: /'JPSMS'/g, to: "'JMS Ocean'" },
    { from: /alt="JPSMS/g, to: 'alt="JMS Ocean' },
    { from: /JPSMS server running/g, to: 'JMS Ocean server running' },
    { from: /JPSMS Sys/g, to: 'JMS Ocean Sys' },
    { from: /JPSMS/g, to: 'JMS Ocean', condition: (content) => !content.includes('window.JPSMS') && !content.includes('JPSMS.') } // Dangerous, maybe skip
];

function processFile(filePath) {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Safe replacements
    content = content.replace(/<title>JPSMS/g, '<title>JMS Ocean');
    content = content.replace(/>JPSMS - /g, '>JMS Ocean - ');
    content = content.replace(/>JPSMS</g, '>JMS Ocean<');
    content = content.replace(/> JPSMS/g, '> JMS Ocean');
    content = content.replace(/alt="JPSMS/g, 'alt="JMS Ocean');
    content = content.replace(/JPSMS server running/g, 'JMS Ocean server running');
    content = content.replace(/JPSMS_DEPLOY/g, 'JMS_OCEAN_DEPLOY'); // Ignore these

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

console.log('Starting system rename...');
walkDir(publicDir);
processFile(serverFile);
console.log('Update complete.');
