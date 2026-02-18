const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//register

exports.register = async(req,res)=>{
    const {name,email,password} = req.body;
    try {
        const hashedpassword = await bcrypt.hash(password);
        const user = await User.create({name,email,password:hashedpassword});
        res.staus(201).json({message:"user register successfully"});
    } catch(err) {
        console.error(err);
    }
}
//login
exports.login = async(req,res)=>{
    const {email,password} = req.body;
    try {
       
        const user = await User.findOne({email});
        if(!user) return  res.staus(401).json({error:"invalid credentials"});

        const match = await bcrypt.compare(password,user.password);
        if(!match) return  res.staus(401).json({error:"invalid credentials"});
       
        const token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:"30d"});
        res.json({token});  
    } catch(err) {
        console.error(err);
    }
}