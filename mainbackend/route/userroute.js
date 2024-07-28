

const express = require("express");
const { isAuthenticatedUser } = require('../middleware/auth');
const router = express.Router();
const { registerUser, loginUser } = require('../controller/usercontoller');


router.route("/register").post(registerUser) ;
router.route("/login").post(loginUser) ;

module.exports = router ;