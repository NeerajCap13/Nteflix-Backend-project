import {User} from '../Model/User.js'


export const registerUser = async (req,res) => {
  try {
    const {email , password} = req.body

    if(!email || !password){
      res.status(400).json({message:"All fields are required"})
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists. Please log in instead." });
    }

    const newUser = await User.register({email,password})
    return res.status(201).json({message:"User Created Successfully",newUser})

  } catch (error) {
    if(error.message){
      res.status(400).json({message:"You Already Exists"})
    }
    return res.status(500).json({message:"Internal server Error"})
  }

}
