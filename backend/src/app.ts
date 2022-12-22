import express from 'express';
import userRouter from './routes/user.routes';
import loginRouter from './routes/login.routes';

const app = express();

app.use(express.json()); 

app.use('/create', userRouter);
app.use('/login', loginRouter);
export default app;