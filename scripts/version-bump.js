const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const versionPath = path.join(__dirname, '..', 'VERSION.json');

try {
    let rawdata = fs.readFileSync(versionPath, 'utf8');
    let data = JSON.parse(rawdata);

    let versionParts = data.version.split('.');
    let patch = parseInt(versionParts[2], 10) + 1;
    data.version = `${versionParts[0]}.${versionParts[1]}.${patch}`;
    data.lastUpdated = new Date().toISOString();

    fs.writeFileSync(versionPath, JSON.stringify(data, null, 2), 'utf8');

    execSync('git add VERSION.json', { cwd: path.join(__dirname, '..') });
    execSync(`git commit -m "chore: bump version to ${data.version}"`, { cwd: path.join(__dirname, '..') });

    console.log(`Successfully bumped version to ${data.version}`);
} catch (err) {
    console.error("Error bumping version:", err);
    process.exit(1);
}
