const User = require("../model/User");
const crypto = require("crypto");
const sendToken = require("../utlis/jwt");




exports.registerUser = async (req, res, next) => {
    const { name, email, password } = req.body
    const user = await User.create({
      name,
      email,
      password
    });
  
    sendToken(user, 201, res);
  };


  exports.loginUser = async (req, res, next) => {
    const { email, password } = req.body;
  
  
    if (!email || !password) {
      return next("Please Enter Email & Password", 400);
    }
  
    const user = await User.findOne({ email }).select("+password");
  
    if (!user) {
      return next("Invalid email or password", 401);
    }
  
    const isPasswordMatched = await user.comparePassword(password);
  
    if (!isPasswordMatched) {
      return next("Invalid email or password", 401);
    }
  
   sendToken(user, 200, res);
  };