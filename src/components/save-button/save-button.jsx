import { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import { baseURL } from '../../../lib/config';
import { FaHeart, FaRegHeart } from 'react-icons/fa';


// Import statement to indicate that you need to bundle `./index.scss`
import "./save-button.scss";

export const SaveButton = ({ movie, user, token, updateUser }) => {
  const [isFavorite, setIsFavorite] = useState(
    user?.favoriteMovies?.includes(movie?._id) || false
  );

  useEffect(() => {
    setIsFavorite(user?.favoriteMovies?.includes(movie?._id) || false);
    window.scrollTo(0, 0);
  }, [movie]);

  
  // Add this movie to list of favorite movies
  const handleAddToFavorites = () => {
    fetch(`${baseURL}/users/${user.username}/movies/${movie._id}`, {
      method: 'POST',
      headers: {
        "Content-Type" : "application/JSON",
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log('Movie added to favorites:', data);
        setIsFavorite(true);
        updateUser(data);
      })
      .catch(error => {
        console.error('Error adding movie to favorites:', error);
        alert('Error adding movie to favorites: ' + error);
      });
  };

  // Remove this movie from list of favorite movies
  const handleRemoveFromFavorites = () => {
    fetch(`${baseURL}/users/${user.username}/movies/${movie._id}`, {
      method: 'DELETE',
      headers: {
        "Content-Type" : "application/JSON",
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log('Movie removed from favorites:', data);
        setIsFavorite(false);
        updateUser(data);
      })
      .catch(error => {
        console.error('Error removing movie from favorites:', error);
        alert('Error removing movie from favorites: ' + error);
      });
  };

  // Add OR remove this movie to/from list of favorite movies
  const handleClick = () => {
    if (isFavorite === true) {
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
  token: PropTypes.string.isRequired,
  updateUser: PropTypes.func.isRequired
};