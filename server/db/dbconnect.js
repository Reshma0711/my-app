const mongoose=require("mongoose")
const dotenv=require("dotenv").config();

const mongouri=process.env.MONGO_URI

exports.dbConnect=async()=>{
    try{
        await mongoose.connect(mongouri);
        console.log("Database Connection Successful")
      
    }
    catch(err){
        console.log("Database Connection failed")
      
    }
}