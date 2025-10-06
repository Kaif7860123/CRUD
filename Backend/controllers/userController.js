const userModel = require("../models/userModel");
const { uploadOnCloudinary } = require("../utills/cloudinary");
exports.user=async(req,res)=>{
const {name,email}=req.body;
const image1=req.files.image[0]?.path;
const image2=req.files.image[1]?.path;
console.log(image1)
const response=await uploadOnCloudinary(image1)
console.log(response)
// console.log(req.files)
if(!email.includes("@gmail.com")){
res.json({msg:"email is not valid"})
}
 
const data=await userModel.create({
    name:name,
    email:email,
    image:response.url
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
