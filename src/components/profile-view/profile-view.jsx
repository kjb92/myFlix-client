import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import { FavoriteMovies } from './favorite-movies';
import { UserInfo } from './user-info';
import { MovieCard } from '../movie-card/movie-card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export const ProfileView = ({ user, token, movies }) => {
  const [userProfile, setUserProfile] = useState(null);

  //Fetch current user's profile information
  useEffect(() => {
    if (!token) {
      return;
    }

    fetch(`https://myflix-kjb92.herokuapp.com/users/${user.username}`, {
      method: 'GET',
      headers: { 
        "Content-Type" : "application/JSON",
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => response.json())
      .then((data) => {
        setUserProfile(data);
      })
      .catch((error) => {
        console.error('Error fetching user profile:', error);
      });
  }, [token]);  

  return (
    <>
      <Row>
        <Col>
          <h2>Profile</h2>
        </Col>
      </Row>
      <Row>
        <Col md={5}>
          <UserInfo user={user} token={token} />
        </Col>
      </Row>
      <Row>
        <Col className="mt-5"></Col>
      </Row>
      <Row>
        <Col>
          <FavoriteMovies user={user} token={token} movies={movies} />
        </Col>
      </Row>
    </>
  );
};

// Here is where we define all the props constraints for the ProfileView
ProfileView.propTypes = {
  user: PropTypes.shape({
      username: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      password: PropTypes.string.isRequired,
      favoriteMovies: PropTypes.arrayOf(PropTypes.string.isRequired)
      .isRequired,
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