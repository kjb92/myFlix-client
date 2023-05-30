import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import { FavoriteMovies } from './favorite-movies';
import { UserInfo } from './user-info';
import { MovieCard } from '../movie-card/movie-card';

export const ProfileView = ({ user, token, movies }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  //Fetch current user's profile information
  useEffect(() => {
    if (!token) {
      return;
    }

    fetch('https://myflix-kjb92.herokuapp.com/users', {
      method: 'GET',
      headers: { 
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => response.json())
      .then((data) => {
        setUserProfile(data.find((u) => u.username === user.username));
        setFavoriteMovies(movies.filter((m) => userProfile.favoriteMovies.includes(m._id)));
      })
      .catch((error) => {
        console.error('Error fetching user profile:', error);
      });
  }, [userProfile]);  

  return (
    <div>
      <h2>Profile</h2>
      <UserInfo user={user} token={token}/>
      <FavoriteMovies favoriteMovies={favoriteMovies} username={user.username} token={token}/>
    </div>
  );
};

// Here is where we define all the props constraints for the ProfileView
ProfileView.propTypes = {
  user: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      password: PropTypes.string.isRequired,
      favoriteMovies: PropTypes.arrayOf(
        PropTypes.shape({
          _id: PropTypes.string.isRequired
        })
      ).isRequired,
      }).isRequired,
  token: PropTypes.string.isRequired,
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
  ).isRequired
};