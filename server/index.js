const express=require('express');
const dotenv=require('dotenv');
const cors=require("cors");
dotenv.config();
const PORT=process.env.PORT||5000
const connectdatabase=require("./connection")
const app=express();
const contactrouter=require('./routes/contact_routes')
app.use(cors());
app.use(express.json());
connectdatabase();
app.use("/",contactrouter);



app.listen(PORT,()=>{
    console.log(`server running on port ${PORT} ✅`);
})