import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card 
      style={{ width: '18rem' }}
      onClick={() => {
            onMovieClick(movie);
          }}
    >
      <Card.Img variant="top" src={movie.image} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>
          {movie.description}
        </Card.Text>
        <Button variant="primary">Open</Button>
      </Card.Body>
    </Card>
    // <div
    //   onClick={() => {
    //     onMovieClick(movie);
    //   }}
    // >
    //   {movie.title}
    // </div>
  );
};

// Here is where we define all the props constraints for the BookCard
MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};
