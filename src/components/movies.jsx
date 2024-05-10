import React, { useState } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/like";
import Pagination from "./pagination";
import _ from "lodash";
import { paginate } from "../utils/paginate";
import SideList from "./sideList";

const Movies = () => {
  const [movies, setMovies] = useState(getMovies());
  const [pageSize, setPageSize] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);

  const handleDelete = (movie) => {
    const newMovies = movies.filter((m) => m._id !== movie._id);
    setMovies(newMovies);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleLike = (movie) => {
    const newMovies = [...movies];
    const index = newMovies.indexOf(movie);
    newMovies[index] = { ...movies[index] };
    newMovies[index].liked = !newMovies[index].liked;
    setMovies(newMovies);
  };

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    setCurrentPage(currentPage - 1);
  };

  // ongenre
  const handleGenreSelect = (genre) => {
    if (genre === "All") {
      setMovies(getMovies());
      return;
    }
    const newMovies = getMovies().filter(
      (movie) => movie.genre.name === genre.name
    );
    setMovies(newMovies);
  };
  // pagination

  const itemsCount = movies.length;
  const pageCount = Math.ceil(itemsCount / pageSize) + 1;
  const pages = _.range(1, pageCount);
  const PaginatedMovies = paginate(movies, currentPage, pageSize);

  return (
    <div className="movie-container">
      <SideList selectGenre={handleGenreSelect} />
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
              {PaginatedMovies.map((movie) => (
                <tr key={movie._id}>
                  <td>{movie.title}</td>
                  <td>{movie.genre.name}</td>
                  <td>{movie.numberInStock}</td>
                  <td>{movie.dailyRentalRate}</td>
                  <td className="actions">
                    <Like movie={movie} handleLike={() => handleLike(movie)} />
                    <button
                      onClick={() => handleDelete(movie)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <Pagination
              onPageChange={handlePageChange}
              currentPage={currentPage}
              pages={pages}
              pageCount={pageCount}
              handleNext={handleNext}
              handlePrevious={handlePrevious}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Movies;
