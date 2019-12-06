const JSRSASign = require("jsrsasign");

// *****************************  GENERATE THE JWT TOKEN ***************************************************
const generateJWT = (header, claims, secretKey) => {
    var sHeader = JSON.stringify(header);
    var sPayload = JSON.stringify(claims);

    return JSRSASign.jws.JWS.sign("HS512", sHeader, sPayload, secretKey);

};

// *******************************************DECODE THE JWT TOKEN***************************************************
const decodeJWT = (sJWT) => {
    const aJWT = sJWT.split(".");
    const uHeader = JSRSASign.b64utos(aJWT[0]);
    const uClaim = JSRSASign.b64utos(aJWT[1]);

    const pHeader = JSRSASign.jws.JWS.readSafeJSONString(uHeader);
    const pClaim = JSRSASign.jws.JWS.readSafeJSONString(uClaim);

    // console.log("pHeader ",pHeader);
    // console.log("pClaim ",pClaim);

    return {pHeader: pHeader, pClaim : pClaim};

};

// *******************************************VALIDATE THE JWT TOKEN***************************************************
const validateJWT = (sJWT) => {
    const token = sJWT;
    const algorithm = "HS512";
    const key = "$CompanySecret!";

    return JSRSASign.jws.JWS.verifyJWT(token, key, { alg: [algorithm] });

};

module.exports = {
    generateJWT,
    decodeJWT,
    validateJWT
};
