import express from 'express';
import connectDB from './db.js';
import cors from 'cors';
import { config as dotenvConfig } from 'dotenv';
import authRoutes from './routes/authRoute.js';
import userRoutes from './routes/userRoute.js';
import shelterRoutes from './routes/shelterRoute.js'
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

dotenvConfig();

const app = express();
app.use(cors({ credentials: true }));
app.use(express.json());

connectDB();
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);

app.use('/api/user', userRoutes);

app.use('/api/shelter',shelterRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
