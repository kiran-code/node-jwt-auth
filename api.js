const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3100;

// Parse application/json

app.use(bodyParser.json());
const DecEnc = require("./dec-enc.js");
const header = {                        // HEADER PART
    alg: "HS512",
    typ: "JWT"
};

const secretKey = "$CompanySecret!";     // KEY
const claims = {                        // PAYLOAD
    Username: "vijayaLakshmi",
    company: "aliza",
    Fullname: "viajaya lakshmi"
};

let sJWT = DecEnc.generateJWT(header, claims, secretKey);
let isJwtTokenValid = DecEnc.validateJWT(sJWT);
let decodedObject = DecEnc.decodeJWT(sJWT);

console.log('Geneated JWT token ', sJWT);
console.log('Is JWT token valid ', isJwtTokenValid);

console.log('Decoded Token header ', decodedObject.pHeader);
console.log('Decoded Token claim or paylaod ',decodedObject.pClaim);

const welcomeMessage = "Welcome to the API Home Page.";

app.get("/", (req, res) => res.send(welcomeMessage));

app.post("/api/GenerateJWT", (req, res) => res.send(sJWT));
app.post("/api/DecodeJWT", (req, res) => res.send(decodedObject));
app.post("/api/ValidateJWT", (req, res) => res.send(isJwtTokenValid));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
