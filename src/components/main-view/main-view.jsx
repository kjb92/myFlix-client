import { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch('https://myflix-kjb92.herokuapp.com/movies', {
      headers: { 
        Authorization: `Bearer ${token}`
      }
    })
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
  }, [token]);

  if (!user) {
    return (
      <LoginView 
        onLoggedIn={(user, token) => {
          setUser(user);
          setToken(token);
        }} 
      />
    );
  }

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)}/>
    );
  }

  if (movies.length === 0) {
    return (
      <div>The list is empty!</div>
    );
  }

  return (
    <div>
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
          );
        })}
      </div>
      <div>
        <button 
          onClick={() => { 
            setUser(null);
            setToken(null);  
          }}>Logout
        </button>
      </div>
    </div>
  );
};