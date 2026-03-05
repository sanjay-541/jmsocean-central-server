const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
// using native fetch inside node if >= v18, else might need node-fetch, but package.json has it.
const fetch = require('node-fetch');

async function testUpload() {
    console.log('--- Starting 150K BOM Master Upload Test ---');
    const startTime = Date.now();

    // Attempt to login first to get a token
    let token = '';
    try {
        console.log('Logging in as admin...');
        const loginRes = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: 'admin', password: '123' })
        });
        const loginData = await loginRes.json();
        if (loginData.token) {
            token = loginData.token;
            console.log('Login successful. Token obtained.');
        } else {
            console.log('Login failed (maybe wrong credentials or port). Proceeding without token to see if it works...');
        }
    } catch (e) {
        console.log('Login request failed, maybe server on different port? Try 5000.');
        // fallback
    }

    const filePath = path.join(__dirname, 'bom_test_150k.xlsx');
    if (!fs.existsSync(filePath)) {
        console.error('Test file missing:', filePath);
        return;
    }

    console.log('Preparing FormData...');
    const formData = new FormData();
    formData.append('file', fs.createReadStream(filePath));

    console.log('Uploading and Processing...');
    const uploadStart = Date.now();
    try {
        const port = 3000; // standard for this app
        const res = await fetch(`http://localhost:${port}/api/masters/bom-upload`, {
            method: 'POST',
            headers: {
                ...(token ? { 'Authorization': `Bearer ${token}` } : {})
            },
            body: formData
        });

        const data = await res.json();
        const endTime = Date.now();

        console.log('\n--- Test Results ---');
        console.log('Status Code:', res.status);
        console.log('Response:', data);
        console.log(`Total Upload Engine Time: ${(endTime - uploadStart) / 1000} seconds`);
        console.log('--------------------\n');
    } catch (err) {
        console.error('Upload Error:', err);
    }
}

testUpload();
