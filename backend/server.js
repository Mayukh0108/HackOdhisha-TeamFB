import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDb from './db/connectDb.js';
import userRoutes from './routes/userRoutes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    cors({
      origin: ['*'],
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
  );


app.use('/api/users', userRoutes);



// Connect to MongoDB
connectDb();

app.get('/', (req, res) => {
    res.send('Hello World!');
}
);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});