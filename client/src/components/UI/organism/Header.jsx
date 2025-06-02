import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Nav = styled.nav`
  background: #333;
  color: white;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
`;

export default function Header() {
  return (
    <Nav>
      <Link to="/">Home</Link>
      <Link to="/books">All Books</Link>
    </Nav>
  );
}
