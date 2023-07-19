
const app=require('./app')
const dotenv=require('dotenv')
const connectDatabase=require('./config/database')

//Handling uncaught exception error : console.log(youtube):undefined

process.on("uncaughtException",(err)=>{
    console.log(`error: ${err.message}`);
    console.log("shutting down server due to uncaught exception error")
process.exit(1);
});

//config so that we can use variable of config.env
dotenv.config({
    path:"backend/config/config.env"
})

//calling function to connect database
connectDatabase();

const server=app.listen(process.env.PORT,()=>{
    console.log(`server is listening at the port ${process.env.PORT}`)
})

//unhandled promise rejection :due to error in connection string
process.on("unhandledRejection",(err)=>{
    console.log(`error: ${err.message}`);
    console.log("shutting down server due to unhandled promise rejection")

    server.close(()=>{
            process.exit(1);
    });
});