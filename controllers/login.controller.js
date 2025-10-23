import {User} from '../Model/User.js'

export const loginUser = async (req,res)=> {
  try {

    const {email,password} = req.body;

    if(!email || !password) {
      return res.status(400).json({message:"All fields are required"})
    }

    const user = await User.findOne({email})

    if(!user){
      return res.status(401).json({message:"Invalid Email"})
    }

    if(!(await user.isPasswordCorrect(req.body.password))) {
      return res.status(401).json({message:"Invalid Password "})
    }

    const accessToken = user.generateAccessToken()
    res.cookie('Token' , accessToken ,{
      httpOnly : true,
      maxAge : 1000*60*60
    });

    return res.status(201).json({message:"Congratulations! You are now Logged IN",email:user.email,accessToken})


  } catch (error) {
    console.log("Error" , error)
    return res.status(500).json({message:"Internal Server Error"})
  }
}
