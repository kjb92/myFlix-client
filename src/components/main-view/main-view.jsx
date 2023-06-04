import { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { NavigationBar } from '../navigation-bar/navigation-bar';
import { ProfileView } from '../profile-view/profile-view';


export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = JSON.parse(localStorage.getItem("token"));
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [favoriteMovies, setFavoriteMovies] = useState([])
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [filteredMovies, setFilteredMovies] = useState([]); 


  //Fill user with localStorage data if existing
  if(!user && storedUser) {
    setUser(storedUser);
    setToken(storedToken);
    setFavoriteMovies(storedUser.FavoriteMovies);
  };

  //variables for favorite list and similar movies
  if (user) {
    var favoriteMovieList= movies.filter((m) => favoriteMovies.includes(m._id));
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
    window.location.reload();
  };


  useEffect(() => {
    if (!token) {
      return;
    }

    fetch('https://myflix-kjb92.herokuapp.com/movies', {
      headers: { 
        "Content-Type" : "application/JSON",
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
      })
      .catch((error) => {
        console.error('Error fetching movies:', error);
      });
  }, [token]);


  return (
    <BrowserRouter>
      <Row>
        <Col>
          <NavigationBar
            handleLogout={handleLogout}
            movies={movies}
            setFilteredMovies={setFilteredMovies}
          />
        </Col>
      </Row>
      <Row>
        <Col className="mt-5"></Col>
      </Row>
      <Row>
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />
          <Route 
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView
                      onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                        setFavoriteMovies(user.favoriteMovies);
                      }}
                    />                  
                  </Col>
                )}
              </>
            }
          />
          <Route 
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col>
                    <MovieView
                      movies={movies}
                      user={user}
                      token={token}
                    />
                  </Col>
                )}
              </>
            }
          />
          <Route 
            path="/profile"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <Col>
                    <ProfileView 
                      user={user}
                      token={token}
                      movies={movies}
                    />
                  </Col>
                )}
              </>
            }
          />
          <Route 
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : filteredMovies ? (
                  <>
                    <>
                      <Navigate to="/" replace />
                      {filteredMovies.map((movie) => {
                        return (
                          <Col className="mb-5" key={movie._id} xs={12} sm={8} md={6} lg={4} xl={3} xxl={3}>
                            <MovieCard 
                              movie={movie} 
                              user={user} 
                              token={token} 
                            />
                          </Col>
                        );
                      })}
                    </>
                  </>                
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                <>
                  <>
                    {movies.map((movie) => {
                      return (
                        <Col className="mb-5" key={movie._id} xs={12} sm={8} md={6} lg={4} xl={3} xxl={3}>
                          <MovieCard 
                            movie={movie} 
                            user={user} 
                            token={token} 
                          />
                        </Col>
                      );
                    })}
                  </>
                </>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};