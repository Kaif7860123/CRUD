
const loginModel = require("../models/loginModel")
const jwt=require("jsonwebtoken")
 
const login = async (req, res) => {   
  try {
    const { password, email } = req.body;
    const data = await loginModel.findOne({ email: email, password: password });

    if (data) {
      const token = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: 60 }); 
      res
        .cookie("token", token, { httpOnly: true }) 
        .json({ msg: "logged in successfully", token }); 
      console.log(token);
    } else {
      res.json({ msg: "Invalid Credential" });
    }
  } catch (error) {
    res.json({ msg: error.message });
    console.log(error.message);
  }
};

 module.exports=login