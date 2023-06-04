import { useState } from 'react';
import PropTypes from "prop-types";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';


export const NavigationBar = ({ handleLogout, filterMovies }) => {
  const [searchTerm, setSearchTerm] = useState(""); // Add state for search term

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value); // Update search term state
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    filterMovies(searchTerm); // Call filterMovies prop function with search term
  };
  
  return (
    <>
      <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">myFlix</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
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
          <Form className="d-flex" onSubmit={handleSearchSubmit}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={searchTerm} // Set the value of the search input to the state variable
              onChange={handleSearchChange} // Add onChange event handler to update the search term state
            />
            <Button variant="outline-success" onClick={handleSearchSubmit}>Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
      </Navbar>
    </>
  );
};

// Here is where we define all the props constraints
NavigationBar.propTypes = {
  handleLogout: PropTypes.func.isRequired,
  filterMovies: PropTypes.func.isRequired
};



