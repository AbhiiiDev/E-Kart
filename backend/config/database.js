const mongoose=require('mongoose')


const connectDatabase=()=>{
    mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true,useUnifiedTopology:true,useUnifiedTopology:true})
    .then((data)=>{
        console.log(`mongodb connected with server : ${data.connect.host}`)
        }).catch((err)=>{
        console.log(err);
        })
}

module.exports=connectDatabase
