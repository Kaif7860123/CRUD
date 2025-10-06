const express=require("express");
const router = require("./routes/routes");
const connectdb = require("./db/connectdb");
const bodyParser = require("body-parser");
const cors=require("cors")
const app=express();
app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
require("dotenv").config()
connectdb()
 
app.use("/api/v1",router)
const PORT=process.env.PORT
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})