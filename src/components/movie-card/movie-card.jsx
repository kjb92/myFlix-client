import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

// Import corresponding Sass file
import "./movie-card.scss";

export const MovieCard = ({ movie, username, token, updateUser }) => {
  const location = useLocation();
  const linkToMovie = `/movies/${encodeURIComponent(movie._id)}`;
  
  // Retrieve user & favoriteMovies from localStorage
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const favoriteMovies = storedUser.favoriteMovies;

  // Check if the movie is a favorite
  const isFavorite = favoriteMovies.includes(movie._id);
  
  // Add this movie to list of favorite movies
  const handleAddToFavorites = () => {
    fetch(`https://myflix-kjb92.herokuapp.com/users/${username}/movies/${movie._id}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        updateUser(data);
        console.log('Movie added to favorites:', data);
        alert('Movie added to favorites');
      })
      .catch(error => {
        console.error('Error adding movie to favorites:', error);
      });
  };

  // Remove this movie from list of favorite movies
  const handleRemoveFromFavorites = () => {
    fetch(`https://myflix-kjb92.herokuapp.com/users/${username}/movies/${movie._id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        updateUser(data);
        console.log('Movie removed from favorites:', data);
        alert('Movie removed from favorites!');
      })
      .catch(error => {
        console.error('Error removing movie from favorites:', error);
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
    <Card
      style={{ width: '18rem' }}
      className="h-100"
    >
      <div style={{ position: 'relative' }}>
        <Link to={linkToMovie}>
          <Card.Img variant="top" src={movie.image} />
        </Link>
        <div
          onClick={handleClick}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            color: 'red',
            fontSize: '28px',
            cursor: 'pointer',
          }}
        >
          {isFavorite ? <FaHeart /> : <FaRegHeart />}
        </div>
      </div>
      <Card.Body>
        <Link to={linkToMovie}>
          <Card.Title>{movie.title}</Card.Title>
        </Link>
        <Card.Text>
          by {movie.director.name}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

// Here is where we define all the props constraints for the MovieCard
MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  }).isRequired,
  username: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired
};
