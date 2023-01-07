import dotenv from 'dotenv';
import express from 'express';
import morgan from './middleware/morgan.js';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import corsOptions from './config/corsOptions.js';
import credentials from './middleware/credentials.js';
import routes from './routes/index.js';
import seeds from './seeds/index.js';

dotenv.config();

// express app
const app = express();

// Middlewares
app.use(morgan);
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(credentials);

// Routes
app.use('/api', routes);

// Connect to db and start the server
mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(process.env.PORT, async () => {
    console.log('Connected to db & listening on port', process.env.PORT);
    await seeds();
  });
}).catch((error) => {
  console.log(error);
});