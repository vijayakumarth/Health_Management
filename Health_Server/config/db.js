const mongoose = require('mongoose');

const connectDB = async()=>{
try{
    await mongoose.connect(process.env.M_URI);
 console.log('✅ MongoDB Connected');
}catch(err){
 console.error(err);
}
}
module.exports = connectDB;