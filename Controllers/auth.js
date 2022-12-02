const userModel = require("../models/user")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()

// Sign Up Authentication
async function signup(req, res, next){
    try {
        const {user_name, password} = req.body;
        if(!user_name || !password){
            return next(new Error("Ensure you enter a Username and a password"))
        }
        const user = await userModel.create({user_name, password})
        const payload = { user: {id: user._id, user_name: user.user_name} } 
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY_TIME })
        user.password = undefined //a trick to prevent the password from being displayed, does not affect the actual password.
        return res.status(200).json({status: "success",token, user})
        } catch (error) {
        res.status(500).send("Something broke")
        }
}



// Log In Authentication
async function login(req, res, next){
    try {
        const {user_name, password} = req.body;
        if(!user_name || !password){
            return next(new Error("Username and password required"))
        }
        const user = await userModel.findOne({user_name})
        if(!user) return next(new Error("User does not exist"))
        const isValidPassword = await user.isValidPassword(password)
        if(!isValidPassword) return next(new Error("password is incorrect !"))
        const payload = { user: {id: user._id, user_name: user.user_name} } 
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY_TIME })
        user.password = undefined //a trick to prevent the password from being displayed, does not affect the actual password.
        return res.status(200).json({status: "success", token, user}) 
        } catch (error) {
        console.log(error)
        res.status(500).send("Something broke")
        }}


module.exports = {
    signup,
    login
}