import PropTypes from "prop-types";
import { useParams } from "react-router";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m.id === movieId);
  const genres = movie.genre.map((genre) => genre.name).join(", ");

  return (
    <div>
      <div>
        <img className="w-100" src={movie.image} alt="Movie Cover" />
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
      <Link to={`/`}>
        <button className="back-button">Back</button>
      </Link>
    </div>
  );
};

// Here is where we define all the props constraints for the BookCard
MovieView.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    director: PropTypes.object.isRequired,
    genre: PropTypes.array.isRequired,
    featured: PropTypes.bool.isRequired
  }).isRequired
};
