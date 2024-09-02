const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv');
const bcrypt=require('bcrypt')
const {user} =require('./models/index')
dotenv.config();
const app = express();
var corsOptions = {
  origin: "http://localhost:3000"
};
app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const db = require("./models/index");
const UserRouter=require('./routes/user')
const TaskRouter=require('./routes/task')

app.use('/user',UserRouter)
app.use('/task',TaskRouter)


db.sequelize.sync().then(async() => {

   

    const AdminExists=await user.count({
        where:{
            role:'admin'
        }
    })
    if(AdminExists===0)
    {

        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(process.env.ADMIN_PASS, salt);  
        await user.create({
            name:process.env.ADMIN_NAME,
            email:process.env.ADMIN_EMAIL,
            password:hashPassword,
            role:'admin'
        })

    }
console.log('Db connected!')
});


app.get("/", (req, res) => {
  res.json({ message: "Welcome to task application." });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});