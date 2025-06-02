import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'; 

const AllBooksWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  padding: 2rem;
`;

const BookCard = styled.div`
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  padding: 1rem;
  background: #a59f9f;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const BookImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const ReadMoreButton = styled(Link)` 
  margin-top: auto;
  padding: 0.5rem 1rem;
  background-color: #820000;
  color: white;
  border: none;
  text-align: center;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;

  &:hover {
    background-color: #360060;
  }
`;

const AllBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5500/api/books')
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.error('Error:', err));
  }, []);

  return (
    <AllBooksWrapper>
      {books.map((book) => (
        <BookCard key={book._id}>
          <BookImage src={book.imageUrl} alt={book.title} />
          <h3>{book.title}</h3>
          <p><strong>Author:</strong> {book.author}</p>
          <p><strong>Genres:</strong> {book.genres?.join(', ')}</p>
          <p><strong>Publish date:</strong> {new Date(book.publishDate).toLocaleDateString()}</p>
          <p>{book.description.slice(0, 100)}...</p>
          <ReadMoreButton to={`/books/${book._id}`}>Read More</ReadMoreButton> 
        </BookCard>
      ))}
    </AllBooksWrapper>
  );
};

export default AllBooks;
