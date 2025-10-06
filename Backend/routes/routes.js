const express=require("express")
const login = require("../controllers/loginController")
const { user, getUserData, deleteUserData, updateUserData } = require("../controllers/userController")
const { verifyJwt } = require("../middleware/verifyJwt")
const uploadFile = require("../middleware/multer")
const router=express.Router()
router.post("/login",login)
// router.post("/user",uploadFile.fields(),verifyJwt,user)
router.post("/user",uploadFile.fields([
    {
        name:"image",
        maxCount:5
    }
]),user)
router.get("/user",getUserData)
router.delete("/user",verifyJwt,deleteUserData)
router.put("/user",verifyJwt,updateUserData)

module.exports=router