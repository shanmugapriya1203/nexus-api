const express = require('express');
const connectDB = require('./db.js')
const cors= require('cors')
require('dotenv').config();


const app = express();
app.use(cors({credentials:true}));
app.use(express.json());

connectDB();

const authRoutes= require('./routes/authRoute.js')
app.use('/api/auth',authRoutes)





const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
