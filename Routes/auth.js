const express = require("express")
const {signup, login} = require("../Controllers/auth")

const authRouter = express.Router();

authRouter.post('/signup', signup);
authRouter.post('/signin', login);

module.exports = authRouter;