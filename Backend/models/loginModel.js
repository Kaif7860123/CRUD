const mongoose=require("mongoose");
const loginModel=new mongoose.Schema({
    email:{type:String,required:true},
    password:{type:Number,required:true}
},{timestamps:true})
module.exports=mongoose.model("login",loginModel)