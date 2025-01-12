const jwt = require("jsonwebtoken");
const User = require("../models/user");
const adminAuth = (req,res,next)=>{
    if(req.query.token === "abc"){
        next();
    }else{
        res.send("Unauthorised user")
    }
}

const userAuth  = async(req,res,next)=>{
    try{
        const decoded = jwt.verify(req.cookies?.token, 'thisismyjwtseckey');
        const user = await User.findById(decoded?._id);
        if (user) {
          req.user = {...user._doc}
          next()
        } else {
            return res.status(401).send("Invalid token")
        }

    }catch(err){
        return res.status(400).send("invalid token")
       

    }
}

module.exports = {adminAuth,userAuth}