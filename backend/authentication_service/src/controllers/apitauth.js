const express = require('express');
const jwt = require('jsonwebtoken');


const apiAuthRouter = express.Router();

apiAuthRouter.get('/validate-user', async (request, response) => {
    // console.log("request", request);
    // console.log("testing", request.headers);
    if (!request.cookies || Object.getPrototypeOf(request.cookies) === null) {
        // console.log("test");
        return response.status(401).send();
    }

    jwt.verify(request.cookies.token, process.env.SECRET_KEY, function (err, decoded) {
        if (err) {
            return response.status(401).send();
        }
        console.log("decoded", decoded);
    });


    // console.log("type", request.cookies === null)
    // console.log("c????", request.cookies);
    // if (request.headers.authorization) {
    //     console.log(request.headers.authorization);
    // }
    // console.log("HUH? No error?");
    return response.status(201).send();
});

module.exports = apiAuthRouter;
