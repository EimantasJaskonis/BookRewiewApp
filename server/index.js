import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import 'dotenv/config';
import bookRoutes from './routes/bookRoutes.js';

const PORT = process.env.PORT || 5501;
const app = express();
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

const mongo = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_USER_PASSWORD}@${process.env.DB_CLUSTER}.${process.env.DB_CLUSTER_ID}.mongodb.net/?retryWrites=true&w=majority&appName=${process.env.DB_CLUSTER}`;
const client = new MongoClient(mongo);

let db;
client.connect()
  .then(() => {
    db = client.db(process.env.DB_NAME);
    app.locals.db = db;
    console.log('Connected to MongoDB');
  })
  .catch((err) => console.error('MongoDB connection error:', err));

app.use(bookRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on PORT ${process.env.PORT}`);
});
