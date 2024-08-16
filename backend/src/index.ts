import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import taskRoutes from './routes/taskRoutes';
import connectDb from './config/db';
import cookieParser from 'cookie-parser';

const app: Application = express();
dotenv.config();

app.use(cors({
    credentials: true,
    origin: "https://drag-n-plan.vercel.app"
}));


app.use(express.json());
app.use(cookieParser());


app.use('/api/v1', userRoutes);
app.use('/api/v1', taskRoutes);









connectDb();


app.listen(process.env.PORT, () => {
    console.log(`server is running ${process.env.PORT}`);
});
