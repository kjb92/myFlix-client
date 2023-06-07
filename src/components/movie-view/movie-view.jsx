import PropTypes from "prop-types";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
import { MovieCard } from "../movie-card/movie-card";
import { SaveButton } from "../save-button/save-button";

export const MovieView = ({ movies, user, token }) => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  const movie = movies.find((m) => m._id === movieId);
  const genres = movie.genre.map((genre) => genre.name);
  const similarMovies = movies.filter(
    (m) =>
      m._id !== movieId && m.genre.some((genre) => genres.includes(genre.name))
  );

  return (
    <>
      <Col md={8}>
        <Row className="fw-bold fs-1 mb-3">
          <Col>{movie.title}</Col>
        </Row>
        <Col>
          <Row className="border-top border-bottom border-secondary">
            <Col xs={5} sm={2}>
              <b>Genre:</b>
            </Col>
            <Col xs={10}>{genres.join(", ")}</Col>
          </Row>
          <Row className="border-bottom border-secondary">
            <Col xs={5} sm={2}>
              <b>Description:</b>
            </Col>
            <Col xs={10}>{movie.description}</Col>
          </Row>
          <Row className="border-bottom border-secondary">
            <Col xs={5} sm={2}>
              <b>Director: </b>
            </Col>
            <Col xs={10} className="fs-6">
              {movie.director.name}
            </Col>
          </Row>
        </Col>
        <Stack direction="horizontal" gap={3} className="mt-3">
          <SaveButton movie={movie} user={user} token={token} />
          <Button variant="secondary" onClick={goBack}>
            Back
          </Button>
        </Stack>
        <Row>
          <Col className="mt-5"></Col>
        </Row>
        <Row className="w-50">
          <img src={movie.image} alt="Movie Cover" />
        </Row>
      </Col>
      <Row>
        <Col className="mt-5"></Col>
      </Row>
      <Col>
        <Row>
          <Col className="fs-2">
            <h3>Similar Movies: </h3>
          </Col>
        </Row>
        <Row>
          {similarMovies.map((similarMovie) => (
            <Col
              className="mb-5"
              xs={12}
              sm={8}
              md={6}
              lg={4}
              xl={3}
              xxl={3}
              key={similarMovie._id}
            >
              <MovieCard movie={similarMovie} user={user} token={token} />
            </Col>
          ))}
        </Row>
        <Row>
          <Col className="mt-5"></Col>
        </Row>
      </Col>
    </>
  );
};

// Here is where we define all the props constraints
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
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string,
    birthday: PropTypes.string,
    favoriteMovies: PropTypes.arrayOf(PropTypes.string.isRequired),
  }).isRequired,
  token: PropTypes.string.isRequired,
};

// One improvement that could be made is to remove the unused Link import on line 5 to avoid the warning message. 
// Another suggestion would be to add some error handling in case the movie variable is undefined, to prevent the code from breaking.