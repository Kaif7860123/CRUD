 
const jwt = require("jsonwebtoken");
exports.verifyJwt = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(403).json({ message: "No token found" });
    }

    
    const token = authHeader.split(" ")[1]; 

    if (!token) {
      return res.status(403).json({ message: "Token missing after Bearer" });
    }

     
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    console.log("Decoded data:", decoded);
    //Attach user info to request
    req.user = decoded;
    next();
  } catch (error) {
    console.error("JWT error:", error.message);
    res.status(401).json({ msg: "Invalid or expired token" });
  }
};
