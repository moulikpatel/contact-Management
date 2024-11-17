const mongoose=require("mongoose");

const formSchema=mongoose.Schema({
    firstName:String,
    lastName:String,
    email:String,
    phoneNumber:Number,
    company:String,
    jobTitle:String
});

const User=mongoose.model("user",formSchema);
module.exports=User;