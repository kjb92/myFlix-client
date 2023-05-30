import PropTypes from 'prop-types';
import { MovieCard } from '../movie-card/movie-card';

export const FavoriteMovies = ({ favoriteMovies, username, token }) => {

  return (
    <div>
      <h3>Favorite Movies</h3>
      {favoriteMovies.length > 0 ? (
        favoriteMovies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} username={username} token={token} />
        ))
      ) : (
        <p>No favorite movies found.</p>
      )}
    </div>
  );
};

// Here is where we define all the props constraints
FavoriteMovies.propTypes = {
  favoriteMovies: PropTypes.arrayOf(
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