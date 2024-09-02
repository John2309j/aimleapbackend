const express=require('express')

const UserRouter=express.Router();
const UserController=require('../controllers/user')
const AuthMiddleWare=require('../middlewares/Authcheck')

UserRouter.post('/signup',UserController.CreateUser)
UserRouter.post('/login',UserController.LoginUser)
UserRouter.post('/logout',AuthMiddleWare.AuthCheck,UserController.LogoutUser)
UserRouter.get('/get-all',AuthMiddleWare.AuthCheck,UserController.GetAllUser)

module.exports=UserRouter