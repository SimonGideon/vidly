import { getGenres } from "../services/fakeGenreService";
import React, { useState } from "react";
const SideList = (props) => {
  const [active, setActive] = useState("All");
  const { selectGenre } = props;
  const genres = getGenres();

  const handleActive = (genre) => {
    genre === "All" ? setActive("All") : setActive(genre.name);
    selectGenre(genre);
  };

  return (
    <div>
      <ul className="list-group">
        <li
          onClick={() => {
            handleActive("All");
          }}
          className={
            active === "All" ? "list-group-item active" : "list-group-item"
          }
          aria-current="true"
        >
          All Genres
        </li>
        {genres.map((genre) => (
          <li
            key={genre._id}
            onClick={() => handleActive(genre)}
            className={
              genre.name === active
                ? "list-group-item active"
                : "list-group-item"
            }
          >
            {genre.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideList;
