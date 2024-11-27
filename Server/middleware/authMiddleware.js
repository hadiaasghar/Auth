const JWT=require('jsonwebtoken');
//decrypt
module.exports= async(req,res,next)=>{
    try {
        //get token
        
        const token = req.headers['authorization'].split(' ')[1]; // Correctly split by space

        JWT.verify(token,process.env.JWT_SECRET,(err,decode)=>{
            if(err){
                return res.status(401).send({
                    success:false,
                    message:"Un-authorize person"

                }
                    
               )
               
            }else{
                req.body.id=decode.id;
                next();
            }
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in auth api'
        })
    }
}