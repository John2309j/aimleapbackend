const {task}=require('../models')
exports.CreateTask=async(req,res)=>{

    if(req.body.name===null || req.body.name===undefined || req.body.name===undefined )
        {
           return res.status(400).json({msg:'name is required field'})
        }
        if(req.body.desc===null || req.body.desc===undefined || req.body.desc===undefined )
        {
          return res.status(400).json({msg:'desc(Task description) is required field'})
        }
        if(req.body.due_date===null || req.body.due_date===undefined || req.body.due_date===undefined )
        {
          return res.status(400).json({msg:'due_date is required field'})
        }

        try{
            const name=req.body.name;
            const desc=req.body.desc;
            const due_date=req.body.due_date;

            await task.create({
                name:name,
                desc:desc,
                due_date:due_date,
                user_id:req.id

            })
           res.status(200).json({msg:'successfully created task'})
        }catch(err)
        {
            res.status(400).json({msg:'error on creating task'}) 
        }

        
}
exports.UpdateTask=async(req,res)=>{

    if(req.body.name===null || req.body.name===undefined || req.body.name===undefined )
        {
           return res.status(400).json({msg:'name is required field'})
        }
        if(req.body.desc===null || req.body.desc===undefined || req.body.desc===undefined )
        {
          return res.status(400).json({msg:'desc(Task description) is required field'})
        }
        if(req.body.due_date===null || req.body.due_date===undefined || req.body.due_date===undefined )
        {
          return res.status(400).json({msg:'due_date is required field'})
        }
        if(req.body.task_id===null || req.body.task_id===undefined || req.body.task_id===undefined )
            {
              return res.status(400).json({msg:'task_id is required field'})
            }

        try{
            const name=req.body.name;
            const desc=req.body.desc;
            const due_date=req.body.due_date;

            await task.update({
                name:name,
                desc:desc,
                due_date:due_date
               

            },{where:{
                id:req.body.task_id
            }})
           res.status(200).json({msg:'successfully updated task'})
        }catch(err)
        {
            res.status(400).json({msg:'error on updating task'}) 
        }

}
exports.ListAllTask=async(req,res)=>{

    try{
        const list=await task.findAll({
            where:{
                user_id:req.id
            }
        })
        res.status(200).json({list:list})

    }catch(err)
    {
        res.status(400).json({msg:'error on fetching task'}) 
    }

}
exports.DeleteTask=async(req,res)=>{

    const id=req.params.id;

    try{
        const list=await task.destroy({
            where:{
                id:id
            }
        })
        res.status(200).json({msg:'Successfully deleted'})

    }catch(err)
    {
        res.status(400).json({msg:'error on deleting task'}) 
    }

    

}

exports.DetailTask=async(req,res)=>{


    try{
        const list=await task.findOne({
            where:{
                id:req.params.id,
                user_id:req.id
            }
        })
        res.status(200).json({list:list})

    }catch(err)
    {
        res.status(400).json({msg:'error on fetching task'}) 
    }



}
exports.AdminListByUser=async(req,res)=>{

    if(req.role==='admin')
    {
        try{
            const list=await task.findAll({
                where:{
                    user_id:req.query.id
                }
            })
            res.status(200).json({list:list})
    
        }catch(err)
        {
            res.status(400).json({msg:'error on fetching task'}) 
        }
    }
    else{
        res.status(400).json({msg:'You dont have access'}) 
    }

}