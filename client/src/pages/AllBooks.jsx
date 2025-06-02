import { useEffect, useState } from 'react';
import styled from 'styled-components';

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5500/api/books')
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <BooksGrid>
      {books.map((book) => (
        <BookCard key={book._id}>
          <Cover src={book.imageUrl} alt={book.title} />
          <Title>{book.title}</Title>
          <Author>{book.author}</Author>
          <p>{book.genres?.join(', ')}</p>
          <Rating>{book.rating}</Rating>
        </BookCard>
      ))}
    </BooksGrid>
  );
};

export default AllBooks;

const BooksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  padding: 2rem;
`;

const BookCard = styled.div`
  background: #f4f4f4;
  padding: 1rem;
  border-radius: 1rem;
  text-align: center;
`;

const Cover = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 0.5rem;
`;

const Title = styled.h3`
  margin: 0.5rem 0 0.25rem;
`;

const Author = styled.p`
  color: #555;
  font-style: italic;
`;

const Rating = styled.div`
  font-weight: bold;
  margin-top: 0.5rem;
`;
