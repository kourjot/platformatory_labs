const {connect} = require('mongoose');
 const connection = async()=>{
    try{
        await connect("mongodb://localhost:27017/temproal");
        console.log("MongoDB connected successfully");
    }catch(err){
        console.log("Error connecting to MongoDB:", err);
    }
}

module.exports = { connection };
