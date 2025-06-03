import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AllBooks from './pages/AllBooks';
import BookDetails from './pages/BookDetails';
import NotFound from './pages/NotFound';
import MainOutlet from "./components/outlet/MainOutlet";
import Header from './components/UI/organism/Header'; 
import Footer from './components/UI/organism/Footer'; 
// import './App.css';

const App = () => {
  
  return (
    <>
    <div className="app-container">
      <Header />
      <Routes path="/" element={<MainOutlet />}>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<AllBooks />} />
        <Route path="/books/:id" element={<BookDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
    </>
  );
};

export default App;