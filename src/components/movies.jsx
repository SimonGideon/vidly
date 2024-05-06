import React, { useState } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/like";

const Movies = () => {
  const [movies, setMovies] = useState(getMovies());

  const handleDelete = (movie) => {
    const newMovies = movies.filter((m) => m._id !== movie._id);
    setMovies(newMovies);
  };

  const handleLike = (movie) => {
    const newMovies = [...movies];
    const index = newMovies.indexOf(movie);
    newMovies[index] = { ...movies[index] };
    newMovies[index].liked = !newMovies[index].liked;
    setMovies(newMovies);
  };

  return (
    <div>
      {movies.length === 0 ? (
        <p className="text-danger mt-3">There are no movies in the database.</p>
      ) : (
        <div>
          <h1 className="text-primary">Movie Base</h1>
          <h3 className="text-success">
            Showing {movies.length} movies in the database.
          </h3>
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Genre</th>
                <th>Stock</th>
                <th>Rate</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {movies.map((movie) => (
                <tr key={movie._id}>
                  <td>{movie.title}</td>
                  <td>{movie.genre.name}</td>
                  <td>{movie.numberInStock}</td>
                  <td>{movie.dailyRentalRate}</td>
                  <td className="actions">
                    <Like movie={movie} handleLike={() => handleLike(movie)} />
                    <button
                      onClick={() => handleDelete(movie)}
                      className="btn btn-danger btn-sm m-1"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Movies;
