export const clearCookie = (req,res) => {
   res.clearCookie('Token' , {
    httpOnly : true,
   });
   res.json({message:"Logout cookie cleared"})
}


