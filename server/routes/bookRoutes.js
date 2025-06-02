import express from 'express';
import { getAllBooks, getBookById } from '../controllers/bookController.js';

const router = express.Router();

// All books
router.get('/books', getAllBooks);

// One book by ID
router.get('/books/:id', getBookById);

export default router;
