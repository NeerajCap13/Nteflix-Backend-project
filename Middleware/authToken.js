import jwt from "jsonwebtoken"

export const verifyToken = (req,res,next) => {

  const token = req.cookies?.Token

  if(!token) {
    return res.status(401).json({message:"Unauthorized Access"})
  }

  try {
    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    req.user = decoded
    next()
  }

  catch(error) {
    return res.status(401).json({message:"Invalid token or expired token"})
  }
}

