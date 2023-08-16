import React from "react";

const API_URL = 'http://www.omdbapi.com?apikey=7ec6dee4';
const movieDetails = ( {movie} ) => {
    const details = async (name) => {
        const response = await fetch(`${API_URL}&t=${name}`);
        const data = await response.json();
        return data;
    };
    const data = details(movie);
    return(
        <div>
            <img src={data.Poster !== 'N/A' ?
             data.Poster : 'https://via.placeholder.com/400' }
              className="poster"
              alt={data.Title}
            />
            <h1>Title {data.Title}</h1>
        </div>
    )
}

export default movieDetails;