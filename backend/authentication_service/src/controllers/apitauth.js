const express = require('express');
const jwt = require('jsonwebtoken');


const apiAuthRouter = express.Router();

apiAuthRouter.get('/validate-user', async (request, response) => {

    if (!request.cookies || Object.getPrototypeOf(request.cookies) === null) {

        return response.status(401).send();
    }

    jwt.verify(request.cookies.token, process.env.SECRET_KEY, function (err, decoded) {
        if (err) {
            return response.status(401).send();
        }
        console.log("decoded", decoded);
        return response.status(201).send();
    });


});

apiAuthRouter.get('/validate-admin', async (request, response) => {

    if (!request.cookies || Object.getPrototypeOf(request.cookies) === null) {
        return response.status(401).send();
    }

    jwt.verify(request.cookies.token, process.env.SECRET_KEY, function (err, decoded) {
        if (err) {
            return response.status(401).send();
        }
        console.log("decoded", decoded);
        if (decoded.role === "admin") {
            return response.status(201).send();
        }
        return response.status(401).send();
    });


});

module.exports = apiAuthRouter;
