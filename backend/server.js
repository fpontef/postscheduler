import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectMongo } from './database/connectDB.js';
import { notFound, errorHandler } from './middleware/errorHandlers.js';

import postRoutes from './routes/postRoutes.js';

dotenv.config();

connectMongo();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/posts', postRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on http://localhost:${PORT}`));
