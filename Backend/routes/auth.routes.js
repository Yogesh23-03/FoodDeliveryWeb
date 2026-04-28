const express = require('express')
const { signIn, signOut, signUp, sendOtp, verifyOtp, resetPassword, googleAuth } = require("../controllers/auth.controllers")

const authRouter = express.Router()

authRouter.post("/signup", signUp)
authRouter.post("/signin", signIn)
authRouter.get("/signout", signOut)
authRouter.post("/sendotp",sendOtp)
authRouter.post("/verifyotp",verifyOtp)
authRouter.post("/resetpassword",resetPassword)
authRouter.post("/googleauth",googleAuth)

module.exports = authRouter