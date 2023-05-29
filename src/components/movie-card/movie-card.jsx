import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie, username, token }) => {
  const handleAddToFavorites = () => {
    fetch(`https://myflix-kjb92.herokuapp.com/users/${username}/movies/${movie._id}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log('Movie added to favorites:', data);
        alert('Movie added to favorites');
      })
      .catch(error => {
        console.error('Error adding movie to favorites:', error);
      });
  };
  
  return (
    <Card 
      style={{ width: '18rem' }}
      className="h-100"
    >
      <Card.Img variant="top" src={movie.image} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>
          {movie.description}
        </Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
          <Button variant="link">Open</Button>
        </Link>
        <Button variant="primary" onClick={handleAddToFavorites}>
          Add to Favorites
        </Button>
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
