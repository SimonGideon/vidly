const Like = (props) => {
  let classes = "fa fa-heart-o";
  if (props.movie.liked) {
    classes = "fa fa-heart text-primary";
  }
  return (
    <div>
      <i
        onClick={() => props.handleLike(props.movie.liked)}
        className={classes}
        style={{ cursor: "pointer" }}
        aria-hidden="true"
      ></i>
    </div>
  );
};

export default Like;
