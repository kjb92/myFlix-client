import {useState, useEffect} from 'react';
import {MovieCard} from '../movie-card/movie-card';
import {MovieView} from '../movie-view/movie-view';

export const MainView = () => {
  const [movies, setMovies] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch('https://myflix-kjb92.herokuapp.com/movies')
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
            _id: movie._id,
            title: movie.title,
            description: movie.description,
            image: movie.imagePath,
            director: movie.director,
            genre: movie.genre,
            featured: movie.featured
          };
        });

        setMovies(moviesFromApi);
      });
  }, []);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)}/>
    );
  }

  if (movies.length === 0) {
    return (
      <div>The list is empty!</div>
    )
  }

  return (
    <div>
      {movies.map((movie) => {
        return (
          <MovieCard 
          key={movie._id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
          />
        )
      })}
    </div>
  );
};