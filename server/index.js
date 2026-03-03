import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/api/v1/post', postRoutes);

app.get('/', (req, res) => {
  res.send('Hello from backend');
});

const startServer = async () => {
  try {
    // ✅ CONNECT TO MONGODB (awaited)
    await connectDB(process.env.MONGODB_URL);
    console.log('MongoDB connected');

    // ✅ USE RENDER PORT
    const PORT = process.env.PORT || 8080;

    app.listen(PORT, '0.0.0.0', () =>
      console.log(`Server running on port ${PORT}`)
    );

  } catch (error) {
    console.error('Server failed to start:', error);
  }
};

startServer();
