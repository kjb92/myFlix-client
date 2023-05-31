import PropTypes from "prop-types";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const goBack = () => { navigate(-1) };
  const movie = movies.find((m) => m._id === movieId);
  const genres = movie.genre.map((genre) => genre.name).join(", ");

  
  return (
    <>
      <Row className="mt-3">
        <Col>
          <Button variant="secondary" onClick={goBack}>
            Back
          </Button>
        </Col>
      </Row>
      <Row className="fw-bold fs-1 mb-3">
        <Col>{movie.title}</Col>
      </Row>
      <Col className="mb-5">
        <Row className="border-top border-bottom border-secondary">
          <Col xs= {5} sm={2}>
            <b>Genre:</b>
          </Col>
          <Col xs={10}>{genres}</Col>
        </Row>
        <Row className="border-bottom border-secondary">
          <Col xs= {5} sm={2}>
            <b>Description:</b> 
          </Col>
          <Col xs={10}>{movie.description}</Col>
        </Row>
        <Row className="border-bottom border-secondary">
          <Col xs= {5} sm={2}>
            <b>Director: </b>
          </Col>
          <Col xs={10} className="fs-6">{movie.director.name}</Col>
        </Row>
      </Col>
      <Row className="w-50">
        <img src={movie.image} alt="Movie Cover" />
        </Row>
    </>
  );
};

// Here is where we define all the props constraints for the BookCard
MovieView.propTypes = {
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
};

