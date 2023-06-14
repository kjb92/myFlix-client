import PropTypes from "prop-types";
import { SaveButton } from "../save-button/save-button";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie, user, token }) => {

  const linkToMovie = `/movies/${encodeURIComponent(movie._id)}`;

  return (
    <Card style={{ width: "16rem" }} className="h-100">
      <div style={{ position: 'relative' }}>
        <Link to={linkToMovie}>
          <Card.Img variant="top" src={movie.image} />
        </Link>
        <div style={{ position: 'absolute', top: '0', right: '0' }}>
          <SaveButton movie={movie} user={user} token={token} />
        </div>
      </div>
      <Card.Body>
        <Link to={linkToMovie}>
          <Card.Title>{movie.title}</Card.Title>
        </Link>
        <Card.Text>by {movie.director.name}</Card.Text>
      </Card.Body>
    </Card>
  );
};

// Here is where we define all the props constraints
MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string,
    birthday: PropTypes.string,
    favoriteMovies: PropTypes.arrayOf(PropTypes.string.isRequired),
  }).isRequired,
  token: PropTypes.string.isRequired,
};