
const app=require('./app')
const dotenv=require('dotenv')
const connectDatabase=require('./config/database')

//config so that we can use variable of config.env
dotenv.config({
    path:"backend/config/config.env"
})

//calling function to connect database
connectDatabase();

app.listen(process.env.PORT,()=>{
    console.log(`server is listening at the port ${process.env.PORT}`)
})