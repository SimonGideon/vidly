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
          key={13}
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
            key={genre._id}
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

ListGroup.defaultParameters = {
  textProperty: "name",
  valueProperty: "_id",
};

export default ListGroup;
