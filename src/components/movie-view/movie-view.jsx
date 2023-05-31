import PropTypes from "prop-types";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const goBack = () => { navigate(-1) };
  const movie = movies.find((m) => m._id === movieId);
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
      <Button variant="secondary" onClick={goBack}>
        Back
      </Button>
    </div>
  );
};

// Here is where we define all the props constraints for the BookCard
MovieView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      director: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
      genre: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
        })
      ).isRequired,
      featured: PropTypes.bool.isRequired,
    })
  ).isRequired,
};

