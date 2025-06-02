import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5500/api/books/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBook(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!book) return <p>Book not found</p>;

  return (
    <Container>
      <Cover src={book.imageUrl} alt={book.title} />
      <Info>
        <Title>{book.title}</Title>
        <Author>by {book.author}</Author>
        <Genres>{book.genres?.join(', ')}</Genres>
        <Description>{book.description}</Description>
        <Details>
          <div><strong>Pages:</strong> {book.pages}</div>
          <div><strong>Published:</strong> {new Date(book.publishDate).toLocaleDateString()}</div>
          <div><strong>Rating:</strong> {book.rating}</div>
          <div><strong>In stock:</strong> {book.amountOfCopies}</div>
        </Details>
      </Info>
    </Container>
  );
};

export default BookDetails;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  padding: 2rem;
`;

const Cover = styled.img`
  max-width: 300px;
  border-radius: 1rem;
  object-fit: cover;
`;

const Info = styled.div`
  flex: 1;
  min-width: 300px;
`;

const Title = styled.h1`
  margin: 0;
`;

const Author = styled.h3`
  margin: 0.5rem 0;
  color: #555;
`;

const Genres = styled.div`
  font-style: italic;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  line-height: 1.6;
`;

const Details = styled.div`
  margin-top: 1rem;
  display: grid;
  gap: 0.5rem;
`;
