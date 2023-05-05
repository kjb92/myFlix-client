export const MovieView = ({movie, onBackClick}) => {
  const genres = movie.Genre.map(genre => genre.Name).join(', ');

  return (
    <div>
      <div>
        <img src={movie.ImagePath} alt="Movie Cover"/>
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.Title}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.Description}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.Director.Name}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{genres}</span>
      </div>
      <div>
        <span>Featured: </span>
        <span>{movie.Featured ? "yes" : "no"}</span>      
      </div>
      <div>
        <button onClick={onBackClick}>Back</button>
      </div>
    </div>
  );
};