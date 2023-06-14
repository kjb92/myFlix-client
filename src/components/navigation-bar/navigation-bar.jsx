import { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import SearchBar from './search-bar';


export const NavigationBar = ({ user, handleLogout, movies, setFilteredMovies  }) => {
  const [query, setQuery] = useState(""); // Add state for search term

  const handleSearch = (query) => {
    const filteredMovies = movies.filter((movie) => {
      const title = movie.title.toLowerCase();
      const searchTerm = query.toLowerCase();
      return title.includes(searchTerm);
    });
  
    setFilteredMovies(filteredMovies);
  };


  //Clear search when query is empty
  useEffect(() => {
    if (query) {
      return;
    }

    setFilteredMovies(null);
  }, [query]);

  
  return (
    <>
      <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">myFlix</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <>
            { user ? (
            <>
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
              >
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <NavDropdown title="Profile" id="navbarScrollingDropdown">
                  <NavDropdown.Item as={Link} to="/profile">View Profile</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <SearchBar handleSearch={handleSearch} query={query} setQuery={setQuery} />
            </>
            ) : (
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
            </Nav>
            )}
          </>
        </Navbar.Collapse>
      </Container>
      </Navbar>
    </>
  );
};

// Here is where we define all the props constraints
NavigationBar.propTypes = {
  user: PropTypes.object, 
  handleLogout: PropTypes.func.isRequired,
  movies: PropTypes.array, 
  setFilteredMovies: PropTypes.func.isRequired
};



// 3. Consider using a debounce function to delay the search until the user has stopped typing for a certain amount of time to reduce the number of unnecessary API calls.
// 4. Consider using a loading spinner or message while the search results are being fetched to improve the user experience.
// Let me know if you need any help implementing these suggestions!