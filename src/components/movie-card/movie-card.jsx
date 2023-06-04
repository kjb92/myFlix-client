import PropTypes from "prop-types";
import { SaveButton } from "../save-button/save-button";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export const MovieCard = ({ movie, user, token }) => {
  const location = useLocation();
  const linkToMovie = `/movies/${encodeURIComponent(movie._id)}`;

  // Check if the movie is a favorite
  const isFavorite = user.favoriteMovies.includes(movie._id);

  // Add this movie to list of favorite movies
  const handleAddToFavorites = () => {
    fetch(
      `https://myflix-kjb92.herokuapp.com/users/${user.username}/movies/${movie._id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/JSON",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Movie added to favorites:", data);
        alert("Movie added to favorites");
        localStorage.setItem("user", JSON.stringify(data));
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error adding movie to favorites:", error);
        alert("Something went wrong" + error);
      });
  };

  // Remove this movie from list of favorite movies
  const handleRemoveFromFavorites = () => {
    fetch(
      `https://myflix-kjb92.herokuapp.com/users/${user.username}/movies/${movie._id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/JSON",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Movie removed from favorites:", data);
        alert("Movie removed from favorites!");
        localStorage.setItem("user", JSON.stringify(data));
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error removing movie from favorites:", error);
        alert("Something went wrong" + error);
      });
  };

  // Add OR remove this movie to/from list of favorite movies
  const handleClick = () => {
    if (isFavorite) {
      handleRemoveFromFavorites();
    } else {
      handleAddToFavorites();
    }
  };

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
