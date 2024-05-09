import express from 'express';
import connectDB from './db.js';
import cors from 'cors';
import { config as dotenvConfig } from 'dotenv';

import cookieParser from 'cookie-parser';

dotenvConfig();

const app = express();
app.use(cors({ credentials: true }));
app.use(express.json());

connectDB();
app.use(bodyParser.json());
app.use(cookieParser());
import authRoutes from './routes/authRoute.js';
app.use('/api/auth', authRoutes);
import userRoutes from './routes/userRoute.js';
import bodyParser from 'body-parser';
app.use('/api/user', userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
