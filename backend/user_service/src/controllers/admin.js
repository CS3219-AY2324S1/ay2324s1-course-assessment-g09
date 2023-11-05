const express = require('express');
const userSchema = require('../utility/ZSchema').userSchema;
const userNoPasswordSchema = require('../utility/ZSchema').userNoPasswordSchema;
const { ZodError } = require('zod');

const userAdminRouter = express.Router();
const db = require('../utility/db').db;
const userAccountTable = require('../utility/db').userAccountTable;






module.exports = userAdminRouter;
