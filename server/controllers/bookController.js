export async function getAllBooks(req, res) {
  try {
    const db = req.app.locals.db;
    const collection = db.collection('books');

    const { yearFrom, yearTo, inStock, sortByRating } = req.query;

    const filter = {};
    if (yearFrom && yearTo) {
      filter.publishDate = {
        $gte: new Date(`${yearFrom}-01-01`),
        $lte: new Date(`${yearTo}-12-31`)
      };
    }

    if (inStock === 'true') {
      filter.amountOfCopies = { $gt: 0 };
    }

    const sort = {};
    if (sortByRating === 'asc') sort.rating = 1;
    if (sortByRating === 'desc') sort.rating = -1;

    const books = await collection.find(filter).sort(sort).toArray();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}

export async function getBookById(req, res) {
  try {
    const db = req.app.locals.db;
    const collection = db.collection('books');

    const book = await collection.findOne({ _id: req.params.id });
    if (!book) return res.status(404).json({ error: 'Book not found' });

    res.json(book);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}
