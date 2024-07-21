import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import route from './routes/route.js';

dotenv.config();

const app = express();
const port = 4444;

app.use(express.json());
app.use("/", route);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

mongoose.connect(process.env.mongourl)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

//VU3LCUhz6VrMBIRt - mongo pass