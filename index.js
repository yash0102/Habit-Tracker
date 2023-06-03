const express = require('express');
const app = express();
const port = process.env.port || 8000;
const db = require('./config/mongoose');

app.use('/', require('./routes'));

app.listen(port , (err) => {
    if (err) {
        console.error('Error in running the server',err);
    }

    console.log(`Server is running on port: ${port}`);
})