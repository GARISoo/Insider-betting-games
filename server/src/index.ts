import * as fs from 'fs';
import dotenv from 'dotenv';
import express from 'express';
import morgan from './middleware/morgan.js';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import corsOptions from './config/corsOptions.js';
import credentials from './middleware/credentials.js';
import routes from './routes/index.js';
// import startup from './startup/index.js';

// express app
const app = express()

// Add the cookie-parser
app.use(cookieParser());

// Add morgan middleware
app.use(morgan)

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials)

// Cross Origin Resource Sharing
app.use(cors(corsOptions))

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }))

// middleware
app.use(express.json())

//serve static files
app.use('/', express.static(path.join(__dirname, '/public')))

// routes
app.use('/', require('./routes/root'))
app.use('/api', routes)

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, async () => {
      console.log('connected to db & listening on port', process.env.PORT)
    //   await startup()
    })
  })
  .catch((error) => {
    console.log(error)
  })


fs;