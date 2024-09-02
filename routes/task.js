const express=require('express')

const TaskRouter=express.Router();
const TaskController=require('../controllers/task')
const AuthMiddleWare=require('../middlewares/Authcheck')

TaskRouter.post('/create',AuthMiddleWare.AuthCheck,TaskController.CreateTask)
TaskRouter.get('/list',AuthMiddleWare.AuthCheck,TaskController.ListAllTask)
TaskRouter.get('/details/:id',AuthMiddleWare.AuthCheck,TaskController.DetailTask)
TaskRouter.delete('/delete/:id',AuthMiddleWare.AuthCheck,TaskController.DeleteTask)
TaskRouter.put('/update',AuthMiddleWare.AuthCheck,TaskController.UpdateTask)
TaskRouter.get('/list-by-user',AuthMiddleWare.AuthCheck,TaskController.AdminListByUser)


module.exports=TaskRouter