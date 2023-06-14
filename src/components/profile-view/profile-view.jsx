import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FavoriteMovies } from './favorite-movies';
import { UserInfo } from './user-info';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export const ProfileView = ({ user, token, movies, updateUser }) => {

  return (
    <>
      <Row>
        <Col>
          <h2>Profile</h2>
        </Col>
      </Row>
      <Row>
        <Col md={5}>
          <UserInfo user={user} token={token} updateUser={updateUser} />
        </Col>
      </Row>
      <Row>
        <Col className="mt-5"></Col>
      </Row>
      <Row>
        <Col>
          <FavoriteMovies user={user} token={token} movies={movies} updateUser={updateUser} />
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
  ).isRequired,
  updateUser: PropTypes.func.isRequired
};

// Improvements:

// 1. Remove the unused imports in the import declaration at line 2.
// 2. Remove the declaration of MovieCard at line 5 since it is not used in the code.
// 3. Remove the declaration of userProfile at line 10 since it is not used in the code.
// 4. Add user and movies to the dependency array of the useEffect hook at line 14 to avoid a warning about missing dependencies.
// 5. Add a key prop to the FavoriteMovies component at line 43 to avoid a warning about missing keys.