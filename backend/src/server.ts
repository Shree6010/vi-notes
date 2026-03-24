import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoutes from './routes/auth';

const app = express();

app.use(cors({ origin: '*', credentials: false }));
app.use(express.json());

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI ?? '';

if (!MONGO_URI) {
  
  console.warn('MONGO_URI is not set. Please configure it in a .env file.');
}

async function start() {
  try {
    if (MONGO_URI) {
      await mongoose.connect(MONGO_URI);
      
      console.log('Connected to MongoDB');
    }

    app.listen(PORT, () => {
     
      console.log(`Vi-Notes auth server listening on port ${PORT}`);
    });
  } catch (error) {
    
    console.error('Failed to start server', error);
    process.exit(1);
  }
}

start();
