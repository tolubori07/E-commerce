const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken=(id)=>{
return jwt.sign({id}, process.env.JWTSECRET,{expiresIn:'30d'})
}
const registerUser=asyncHandler(async(req,res)=>{
//get form data and check if all fields have been filled
const {username,email,password} = req.body;
  if(!username||!email||!password){
    res.status(400);
    throw new Error("Please fill out all fields")
  }

  //check if the user exists
  const userExists = await User.findOne({email})
  if(userExists){
    res.status(400);
    throw new Error("User already exists!!")
  }

  //hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password,salt);

  //create the user
  const user = User.create(
    {
      username,
      email,
      password:hashedPassword
    }
)
if(user){
res.status(201).json({
    id:user.id,
    username:user.username,
    email: user.email,
    token:generateToken(user._id)
    });
  }else{
res.status(400)
throw new Error("Invalid user details")
  }
})

//get current user
const getMe = asyncHandler( async(req,res)=>{
 res.status(200).json(req.user);
})

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Login details");
  }

});
module.exports={
registerUser,
getMe,
loginUser,
}

