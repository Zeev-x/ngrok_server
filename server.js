const express = require('express');
const ngrok = require('ngrok');
const fs = require('fs');
const config = require('./config.json');

const port = config.port;
const ngrokAuthToken = config.ngrokAuthToken;
const ngrokDomain = config.ngrokDomain;
const server = express();

server.use(express.static('public'));

server.listen(port, async () => {
    try {
        const url = await ngrok.connect({
            addr: port,
            authtoken: ngrokAuthToken,
            hostname: ngrokDomain
        });
        console.log(`Server ngrok berjalan di https://${ngrokDomain}`);
    } catch (error) {
        console.error('Error starting ngrok:', error);
    }
});