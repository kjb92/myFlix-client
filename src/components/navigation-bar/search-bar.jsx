import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';

const SearchBar = ({ handleSearch, query, setQuery }) => {
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
        type="search"
        placeholder="Search by title..."
        className="me-2"
        aria-label="Search"
        value={query}
        onChange={handleSearchChange}
      />
      <Button variant="outline-success" onClick={handleSearchSubmit}>
        Search
      </Button>
    </Form>
  );
};

SearchBar.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
  setQuery: PropTypes.func.isRequired
};

export default SearchBar;
