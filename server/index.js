import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import 'dotenv/config';
import bookRoutes from './routes/bookRoutes.js';

const app = express();
const PORT = process.env.PORT || 5501;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_USER_PASSWORD}@${process.env.DB_CLUSTER}.${process.env.DB_CLUSTER_ID}.mongodb.net/?retryWrites=true&w=majority&appName=${process.env.DB_CLUSTER}`;

const client = new MongoClient(mongoURI);

let db;

client.connect()
  .then(() => {
    db = client.db(process.env.DB_NAME);
    app.locals.db = db;
    console.log('Connected to MongoDB');
  })
  .catch((err) => console.error('Connection error:', err));

app.use('/api', bookRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on PORT:${PORT}`);
});
