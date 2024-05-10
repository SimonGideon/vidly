const ListGroup = (props) => {
  const {
    genres,
    handleSelectedItem,
    selectedGenre,
    textProperty,
    valueProperty,
  } = props;

  return (
    <div>
      <ul className="list-group">
        <li
          onClick={() => {
            handleSelectedItem("All");
          }}
          className={
            selectedGenre === "All"
              ? "list-group-item active"
              : "list-group-item"
          }
          aria-current="true"
        >
          All Genres
        </li>
        {genres.map((genre) => (
          <li
            key={genre[valueProperty]}
            onClick={() => handleSelectedItem(genre)}
            className={
              genre[textProperty] === selectedGenre
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

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default ListGroup;
