const{v2}=require("cloudinary")
v2.config({
    cloud_name:"mohammad-kaif",
    api_key:696193718583925,
    api_secret:"9OcIuWMBmY8LoV_Wpuq8Pk8pU5k"
})
exports.uploadOnCloudinary=async(localfilePath)=>{
    console.log(localfilePath)
try {
    if(!localfilePath){
        return null
    }
    const response=await v2.uploader.upload(localfilePath,{resource_type:"auto"}) 
        console.log("file is uploaded on cloudinary successfully",response.url)

    return response
    
    
} catch (error) {
    console.log(error.message)
}
}