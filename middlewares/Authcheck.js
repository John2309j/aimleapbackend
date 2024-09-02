const jwt=require('jsonwebtoken')
const {user}=require('../models')


exports.AuthCheck=async(req,res,next)=>{


    const Token=req.headers.authorization;
    if(Token===undefined || Token===null || Token==='')
    {
    return  res.status(401).json({msg:'Unauthorized'})
    }

    const CheckTokenExists=await user.count({
        where:{
            token:Token
        }
    })

    if(CheckTokenExists!==0)
        {
    
            jwt.verify(Token,process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
                if (err) 
                    {
                        return res.status(401).json({msg:'Invalid/Expired Token'});
                    }
                    else{
    
                       
                       
                        req.id = decoded.id;
                        req.name = decoded.name;
                        req.email = decoded.email;
                        req.role = decoded.role;
                        next();
                       
                    }
             
              
            })
    
        }
        else{
            return res.status(401).json({msg:'Invalid/Expired Token'}); 
        }
    
}