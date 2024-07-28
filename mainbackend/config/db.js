const mongoose = require("mongoose") ;
const connectDB = async() => {
    
        mongoose.set('strictQuery', false);
        const conn = await mongoose.connect("mongodb+srv://admin-hunain:dragonx123@cluster0.mjcd13o.mongodb.net/toss") ;
        console.log("Connected_to_MongoDB") ;
                 
  
};

module.exports = connectDB ;