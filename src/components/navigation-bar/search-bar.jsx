import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Spinner } from 'react-bootstrap';

const SearchBar = ({ handleSearch, query, setQuery, loading }) => {
  const handleSearchChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    handleSearch(query);
  };

  return (
    <Form className="d-flex" onSubmit={handleSearchSubmit}>
      <Form.Control
        id="search-bar"
        type="search"
        placeholder="Search by title..."
        className="me-2"
        aria-label="Search"
        value={query}
        onChange={handleSearchChange}
      />
      <Button variant="outline-success" onClick={handleSearchSubmit}>
        {loading ? (
          <>
            <Spinner animation="border" size="sm" className="me-1" />
            Loading...
          </>
        ) : (
          'Search'
        )}
      </Button>
    </Form>
  );
};

SearchBar.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
  setQuery: PropTypes.func.isRequired,  
  loading: PropTypes.bool.isRequired,
};

export default SearchBar;
