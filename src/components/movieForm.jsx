import React from "react";
const MovieForm = ({ match }) => {
  return (
    <div>
      <h1>Movie Form {match.params.id}</h1>
      <button className="btn btn-primary" to="/movies">
        Save
      </button>
    </div>
  );
};

export default MovieForm;
