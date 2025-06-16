import dotenv from 'dotenv';
dotenv.config();

import express, { Application } from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import taskRoutes from './routes/taskRoutes';
import connectDb from './config/db';
import cookieParser from 'cookie-parser';

const app: Application = express();



connectDb();

const production = process.env.NODE_ENV == 'production';

app.use(cors({
  credentials: true,
  origin: production ? "https://drag-n-plan.vercel.app" :  "http://localhost:5173" 
}));


app.use(express.json());
app.use(cookieParser());


app.use('/api/v1', userRoutes);
app.use('/api/v1', taskRoutes);





const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

