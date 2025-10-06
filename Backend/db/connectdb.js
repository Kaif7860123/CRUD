const mongoose=require("mongoose");
const connectdb=async()=>{
    const connect=await mongoose.connect(`${process.env.MONGODB_URI}/reactCrud`).then(()=>{
        console.log("connection done")
    }).catch((err)=>{console.log(err.message)})
}
module.exports=connectdb