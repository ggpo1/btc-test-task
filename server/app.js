const express = require('express');
const app = express();
const connector = require('./connector/connector');
const port = 3000;

app.get('/', async (req, res) => {
    //   res.send();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
    try {
        const result = await connector.makeRequest('GET', `orderBook/L2`, {});
        res.send(result[0]);
    } catch (e) {
        console.error(e);
    };
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
