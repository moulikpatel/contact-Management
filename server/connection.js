const mongoose=require('mongoose');

const connectdb=()=>{
    try {
        mongoose.connect(process.env.MONGO_URI).then(()=>{
            console.log("Database connected ✅");
            
        })
        
    } catch (error) {
        console.log(error);
        
    }
}
module.exports=connectdb;