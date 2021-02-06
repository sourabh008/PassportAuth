const mongoose=require("mongoose");
const userSchema=new mongoose.Schema({
    googleId:String,
    username:String,
    f_name:String,
    email:String,
    l_name:String,
    password:String,
    image:String
})
const User1=mongoose.model("User1",userSchema);
module.exports=User1;