// server/index.js

const express = require("express");
const cors = require('cors');
const fs = require('fs');
const winston = require('winston');
const {error} = require("winston");

const PORT = process.env.PORT || 3009;

const app = express();

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        //
        // - Write all logs with importance level of `error` or less to `error.log`
        // - Write all logs with importance level of `info` or less to `combined.log`
        //
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
    ],
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}


app.use(cors({origin: 'http://localhost:3000'}));

// app.use(
//     cors({origin: ['http://localhost:3009', 'http://127.0.0.1:3009']})
// );


app.get("/api", (req, res) => {
    logger.log({
        level: 'info',
        message: 'Hello distributed log files!'
    });

    logger.info('Hello again distributed logs');
    res.json({ message: "Hello from server!" });
});

app.get("/markers", (req, res) => {

    let rawdata = fs.readFileSync('markers.json');
    let markers = JSON.parse(rawdata);
    res.json({ makers: markers });
});


app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
