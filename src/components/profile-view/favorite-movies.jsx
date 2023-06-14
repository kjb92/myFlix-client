import PropTypes from 'prop-types';
import { MovieCard } from '../movie-card/movie-card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export const FavoriteMovies = ({ user, token, movies, updateUser }) => {
  const favoriteMovieList = movies.filter((m) => user.favoriteMovies.includes(m._id));

  return (
    <>
      <Row>
        <Col>
          <h3>My Favorite Movies</h3>
        </Col>
      </Row>
      <Row>
        {user.favoriteMovies.length > 0 ? (
          favoriteMovieList.map((movie) => (
            <Col className="mb-5" key={movie._id} xs={12} sm={8} md={6} lg={4} xl={3} xxl={3}>
              <MovieCard movie={movie} user={user} token={token} updateUser={updateUser}/>
            </Col>
          ))
        ) : (
        <Col>
          <p>No favorite movies found.</p>
        </Col>
        )}
      </Row>
    </>
  );
};

// Here is where we define all the props constraints
FavoriteMovies.propTypes = {
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


// Improvements:

// 3. Use the Container component from react-bootstrap to wrap the Row components.
// 4. Use the Col component from react-bootstrap to wrap the h3 element.
// 5. Use the isAuthenticated prop from the user object to determine if the user is logged in instead of checking the length of the favoriteMovies array.