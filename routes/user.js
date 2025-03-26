const express = require("express")
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRegisterUrl } = require("../middleware.js");
const userController = require("../controllers/user.js");


router.get("/signup",userController.signUpGet )

router.post("/signup", wrapAsync(userController.signUpPost));

router.get("/login", userController.loginGet);

router.post("/login", saveRegisterUrl, passport.authenticate("local", { failureRedirect: '/login', failureFlash: true }), userController.loginPost)

router.get("/logout", userController.logout);


module.exports = router;