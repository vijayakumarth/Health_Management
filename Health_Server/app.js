const express= require("express");
const cors =require("cors");
const dotenv= require("dotenv");
const connectDB = require('./config/db');
const patientRoutes = require('./routes/patientRoutes');
const authRoutes = require('./routes/authRoutes');




dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());


app.use('/api/patients', patientRoutes);
app.use('/api/auth', authRoutes);


const PORT = process.env.PORT || 5000;
app.listen (5000,()=>{
    console.log(`🚀 Server running on port ${PORT}`)
})