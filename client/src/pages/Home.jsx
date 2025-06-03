import React, { useState } from 'react';
import styled from 'styled-components';

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  min-width: 100%;
  background-image: url('https://upload.wikimedia.org/wikipedia/commons/4/47/Kuncinas_2023b.jpg');
  background-size: cover;
  background-position: center;
`;

const Content = styled.div`
  flex: 1;
  color: #ffffff;
  font-size: 1.2rem;
  padding: 2rem;
  display: flex;
  margin-top: 0,1rem;
  margin-bottom: 24rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const FilterForm = styled.form`
  display: flex;
  gap: 1,2rem;
  flex-wrap: wrap;
  margin-top: 1,2rem;
  justify-content: center;
`;


const Home = () => {
  const [yearFrom, setYearFrom] = useState('');
  const [yearTo, setYearTo] = useState('');
  const [inStock, setInStock] = useState(false);
  const [sortByRating, setSortByRating] = useState('');

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear + 1 }, (_, i) => currentYear - i);

  const handleFilter = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();

    if (yearFrom) params.append('yearFrom', yearFrom);
    if (yearTo) params.append('yearTo', yearTo);
    if (inStock) params.append('inStock', 'true');
    if (sortByRating) params.append('sortByRating', sortByRating);

    const query = params.toString();
    window.location.href = `/books?${query}`;
  };

  return (
    <HomeWrapper>
      <Content>
        <h1>Welcome to the Book Library</h1>
        <h2>Explore top-rated books and share your thoughts.</h2>

        <FilterForm onSubmit={handleFilter}>
          <label>
            From:
            <select
              value={yearFrom}
              onChange={(e) => setYearFrom(e.target.value)}
            >
              <option value="">Select year</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </label>
          <label>
            To:
            <select
              value={yearTo}
              onChange={(e) => setYearTo(e.target.value)}
              disabled={!yearFrom}
            >
              <option value="">Select year</option>
              {years
                .filter((year) => !yearFrom || year >= parseInt(yearFrom))
                .map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
            </select>
          </label>

          <label>
            <input
              type="checkbox"
              checked={inStock}
              onChange={(e) => setInStock(e.target.checked)}
            />
            Only available books
          </label>
          <select
            value={sortByRating}
            onChange={(e) => setSortByRating(e.target.value)}
          >
            <option value="">Sort by rating</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
          <button type="submit">Filter</button>
        </FilterForm>
      </Content>
      
    </HomeWrapper>
  );
};

export default Home;
