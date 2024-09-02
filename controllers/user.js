
const {user}=require('../models')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const { where } = require('sequelize')

exports.CreateUser=async(req,res)=>{

    
    

    if(req.body.name===null || req.body.name===undefined || req.body.name===undefined )
    {
       return res.status(400).json({msg:'name is required field'})
    }
    if(req.body.email===null || req.body.email===undefined || req.body.email===undefined )
    {
      return res.status(400).json({msg:'email is required field'})
    }
    if(req.body.password===null || req.body.password===undefined || req.body.password===undefined )
    {
      return res.status(400).json({msg:'password is required field'})
    }

    if(req.body.email!=='')
    {
     if(!validateEmail(req.body.email))
     {
        return res.status(400).json({msg:'valid email address is required'}) 
     }
    }
    if(req.body.password!=='')
        {
         if(!validatePassword(req.body.password))
         {
            return res.status(400).json({msg:'valid password is required(Min:8 chars, One letter , One number,One symbol)'}) 
         }
        }


        try{

            const count=await user.count({
                where:{
                    email:req.body.email
                }
            })
        
            if(count===0){
                const salt = await bcrypt.genSalt();
                const hashPassword = await bcrypt.hash(req.body.password, salt);  
                await user.create({
                    name:req.body.name,
                    email:req.body.email,
                    password:hashPassword,
                    role:'user'
                })
                res.status(200).json({msg:'User created successfully. Please login'})
            }
            else{
                res.status(400).json({msg:'User name already exists.Please login'})  
            }
           
        }catch(err)
        {
            res.status(400).json({msg:'User creation failed!. Try again'})
            console.log(err)
        }

     

        

}
exports.LoginUser=async(req,res)=>{


    if(req.body.email===null || req.body.email===undefined || req.body.email===undefined )
        {
          return res.status(400).json({msg:'email is required field'})
        }
        if(req.body.password===null || req.body.password===undefined || req.body.password===undefined )
        {
          return res.status(400).json({msg:'password is required field'})
        }

        try{
            const UserFind=await user.findOne({
                where:{
                    email:req.body.email
                }
            })
      
        
            if(UserFind===null)
            {
                res.status(400).json({msg:'Invalid Login. Please try again'})
            }
            else{
               const passValid= await bcrypt.compare(req.body.password, UserFind.password);
               if(passValid)
               {
                const id=UserFind.id
                const email=UserFind.email
                const role=UserFind.role
                const name=UserFind.name
                const Token = jwt.sign(
                    { id, name, email, role },
                    process.env.ACCESS_TOKEN_SECRET,
                    {
                      expiresIn: '1d',
                    }
                  );

                  await user.update({
                    token:Token
                  },{
                    where:{
                        email:UserFind.email
                    }
                  })

                  res.status(200).json({token:Token,user:UserFind})
               }
               else{
                res.status(400).json({msg:'Invalid login'})
               }
            }

        }catch(err)
        {
            console.log(err)
            res.status(400).json({msg:'Something went wrong. Please try again'})
        }
  

   

}

exports.LogoutUser=async(req,res)=>{


    console.log(req.email)
    try{

        
        await user.update({
            token:null
          },{
            where:{
                email:req.email
            }
          })

          res.status(200).json({msg:'successfully logged out!'})

    }catch(err)
    {
        console.log(err)
      
        res.status(400).json({msg:'Error on  logging out!'})  
    }

  

}
exports.GetAllUser=async(req,res)=>{

    if(req.role==='admin')
    {
     const list = await user.findAll({
        where:{
            role:'user'
        }
     })
     res.status(200).json({list:list})
    }
    else{
        res.status(400).json({msg:'You dont have access!'})  
    }

}

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
  function validatePassword(password) {
    // Regex: Minimum 8 characters, at least one letter, one number, and one special character
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  }