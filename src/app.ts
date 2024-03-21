// src/app.ts
import express, { Application, Request, Response, NextFunction } from 'express';
import userRoutes from './routes/userRouter';
import authRoutes from './routes/authRouter';
import { errorHandler } from './middleware/errorMiddleware';

const app: Application = express();

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

app.use(errorHandler);

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
