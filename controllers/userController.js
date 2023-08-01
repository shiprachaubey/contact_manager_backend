const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

//@desc Register User
//@route POST /api/users/register user create kr rhe the id tho uska route /api/contacts/register hai na nhii 
//@access public
const registerUser = asyncHandler(async(req,res) =>{
    const {username, email, password } = req.body;
    if(!username || !email ||!password){
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    const userAvaiable = await User.findOne({email});

    if(userAvaiable){
        res.status(400);
        throw new Error("User already register!");
    }

//hash password
const hashPassword = await bcrypt.hash(password,10);

console.log("Hashed Password", hashPassword);

const user = await User.create({
    userName:username,email, password: hashPassword,
});

console.log(`User created ${user}`);

if(user){
    return res.status(201).json({_id: user._id, email:user.email});
}else{
   res.status(400);
   throw new Error("User data is not vaid");
}

})
//@desc Login User
//@route POST /api/users/login
//@access public
const loginUser =asyncHandler(  async (req,res) =>{
    const {email,password} = req.body;
    if(!email||!password){
    res.status(400);
    throw new Error("All Fields are mandatory!");
    }
    const user = await User.findOne({ email});
    
    //compare password with hashpassword
    if(user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign({
            user: {
                userName:user.username,
                email:user.email,
                id: user._id,
            },
        },`${process.env.ACCESS_TOKEN_SECRET}`,
        {expiresIn:"2 days"} 
        )
       return res.status(200).json({ accessToken});

    }else {
        res.status(401);
        throw new Error("email or password is not valid")
    }
  
});



//@desc Current User info
//@route POST /api/users/current
//@access private
const currentUser = asyncHandler( async (req,res) =>{
    res.json(req.user);
});


 module.exports = {registerUser, loginUser, currentUser} ;