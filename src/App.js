import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import searchIcon from './search.svg';
import MovieCard from "./MovieCard";
import MovieDetail from "./MovieDetail.jsx";
import Home from "./Home";

const API_URL = 'http://www.omdbapi.com?apikey=7ec6dee4';

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        setMovies(data.Search);
    };

    return (
        <Router>
            <div className="app">
                <Link to="/" className="header-link">Movie Kingdom</Link>
                <div className="search">
                    <input
                        placeholder="Search for movies"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Link to="/movies">
                        <img
                            src={searchIcon}
                            alt="search"
                            onClick={() => searchMovies(searchTerm)}
                        />
                    </Link>
                </div>

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/movies" element={<MovieList movies={movies} />} />
                    <Route path="/details/:movieTitle" element={<MovieDetail />} />
                </Routes>
            </div>
        </Router>
    );
};

const MovieList = ({ movies }) => (
    <div className="container">
        {movies.map((movie) => (
            <Link to="/details/:movie.Title">
                <MovieCard
                    key={movie.imdbID}
                    movie={movie}
                />
            </Link>
        ))}
    </div>
);

export default App;
