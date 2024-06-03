import React, { useState } from "react";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "./common/pagination";
import _ from "lodash";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroups";
import MoviesTable from "./moviesTable";
import { getGenres } from "../services/fakeGenreService";

const Movies = () => {
  const [movies, setMovies] = useState(getMovies());
  const [pageSize, setPageSize] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [sortColumn, setSortColumn] = useState({ path: "title", order: "asc" });
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

  // sorting
  // sorting
  const handleSort = (path) => {
    setSortColumn({ path, order: "asc" });
  };
  const sorted = _.orderBy(movies, [sortColumn.path], [sortColumn.order]);

  // pagination

  const itemsCount = movies.length;
  const pageCount = Math.ceil(itemsCount / pageSize) + 1;
  const pages = _.range(1, pageCount);
  const PaginatedMovies = paginate(movies, currentPage, pageSize);

  // sideList
  const handleSelectedGenre = (genre) => {
    if (genre === "All") {
      setMovies(getMovies());
      return;
    }
    const newMovies = getMovies().filter(
      (movie) => movie.genre.name === genre.name
    );
    setCurrentPage(1);
    setMovies(newMovies);
  };
  const genres = getGenres();
  const handleSelectedItem = (genre) => {
    genre === "All" ? setSelectedGenre("All") : setSelectedGenre(genre.name);
    handleSelectedGenre(genre);
  };

  return (
    <div className="movie-container">
      <ListGroup
        genres={genres}
        handleSelectedItem={handleSelectedItem}
        selectedGenre={selectedGenre}
      />
      {movies.length === 0 ? (
        <p className="text-danger mt-3">There are no movies in the database.</p>
      ) : (
        <div>
          <h1 className="text-primary">Movie Base</h1>
          <h3 className="text-success">
            Showing {movies.length} movies in the database.
          </h3>
          <MoviesTable
            movies={movies}
            onDelete={handleDelete}
            onLike={handleLike}
            PaginatedMovies={PaginatedMovies}
            onSort={handleSort}
          />
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
