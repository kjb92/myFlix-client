import PropTypes from "prop-types";
import { useLocation } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// Import statement to indicate that you need to bundle `./index.scss`
import "./save-button.scss";

export const SaveButton = ({ movie, user, token }) => {
  const location = useLocation();

  // Check if the movie is a favorite
  const isFavorite = user.favoriteMovies.includes(movie._id);
  
  // Add this movie to list of favorite movies
  const handleAddToFavorites = () => {
    fetch(`https://myflix-kjb92.herokuapp.com/users/${user.username}/movies/${movie._id}`, {
      method: 'POST',
      headers: {
        "Content-Type" : "application/JSON",
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log('Movie added to favorites:', data);
        alert('Movie added to favorites');
        localStorage.setItem("user", JSON.stringify(data));
        window.location.reload();
      })
      .catch(error => {
        console.error('Error adding movie to favorites:', error);
        alert('Something went wrong' + error);
      });
  };

  // Remove this movie from list of favorite movies
  const handleRemoveFromFavorites = () => {
    fetch(`https://myflix-kjb92.herokuapp.com/users/${user.username}/movies/${movie._id}`, {
      method: 'DELETE',
      headers: {
        "Content-Type" : "application/JSON",
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log('Movie removed from favorites:', data);
        alert('Movie removed from favorites!');
        localStorage.setItem("user", JSON.stringify(data));
        window.location.reload();
      })
      .catch(error => {
        console.error('Error removing movie from favorites:', error);
        alert('Something went wrong' + error);
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
    <div className="button-wrapper">
      <div onClick={handleClick} className="save-button">
        {isFavorite ? <FaHeart /> : <FaRegHeart />}
      </div>
    </div>
  );
};

// Here is where we define all the props constraints
SaveButton.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  }).isRequired,
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string,
    birthday: PropTypes.string,
    favoriteMovies: PropTypes.arrayOf(PropTypes.string.isRequired)
    }).isRequired,
  token: PropTypes.string.isRequired
};
