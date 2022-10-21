// server/index.js

const express = require("express");
const cors = require('cors');
const fs = require('fs');



const PORT = process.env.PORT || 3009;

const app = express();


app.use(cors({origin: 'http://localhost:3000'}));

// app.use(
//     cors({origin: ['http://localhost:3009', 'http://127.0.0.1:3009']})
// );


app.get("/api", (req, res) => {
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
