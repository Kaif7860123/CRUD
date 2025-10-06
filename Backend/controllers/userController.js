const userModel = require("../models/userModel");
exports.user=async(req,res)=>{
const {name,email}=req.body;
if(!email.includes("@gmail.com")){
res.json({msg:"email is not valid"})
}
 
const data=await userModel.create({
    name:name,
    email:email
})
await data.save()
res.json({msg:"record saved"})
}
exports.getUserData=async(req,res)=>{
const getData=await userModel.find()
console.log(getData)
res.send({msg:"get user data",getData})
}
exports.deleteUserData=async(req,res)=>{
const id=req.body.id
const deleteData=await userModel.findOneAndDelete({_id:id})
console.log(deleteData)
res.json({msg:"user deleted successfully",deleteData})
}
exports.updateUserData=async(req,res)=>{
const {id,name,email}=req.body
console.log(name)
const updateData=await userModel.findByIdAndUpdate({_id:id},{name:name,email:email})
console.log(updateData)
res.json({msg:"update data successfully",updateData})
}
