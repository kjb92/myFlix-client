export const MovieView = ({movie, onBackClick}) => {
  const genres = movie.genre.map(genre => genre.name).join(', ');

  return (
    <div>
      <div>
        <img src={movie.imagePath} alt="Movie Cover"/>
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.title}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.description}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.director.name}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{genres}</span>
      </div>
      <div>
        <span>Featured: </span>
        <span>{movie.featured ? "yes" : "no"}</span>      
      </div>
      <div>
        <button onClick={onBackClick}>Back</button>
      </div>
    </div>
  );
};