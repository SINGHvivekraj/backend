const mongoose=require('mongoose');

//creating a schema for user model
const userschema=new mongoose.Schema({
    username:String,
    email:String,
    password:String
})

const usermodel=mongoose.model('user',userschema);
module.exports=usermodel;
