import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Stack from 'react-bootstrap/Stack';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link } from "react-router-dom";
import { baseURL } from '../../../lib/config';


export const LoginView = ({ handleLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  
  const handleSubmit = (event) => {
    // this prevents the default behaviour of the form which is to reload the entire page
    event.preventDefault();

    const data = {
      username: username, 
      password: password
    };

    fetch(`${baseURL}/login?username=${username}&password=${password}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((response) => response.json())
    .then((data) => {
      console.log("Login response: ", data);
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", JSON.stringify(data.token));
        handleLogin(data.user, data.token);
      } else {
        alert("No such user"); 
      }
    })
    .catch((error) => {
      alert("Something went wrong", error);
    });
  };

  //Form validation
  useEffect(() => {
    // Check if both username and password have a minimum length
    setIsFormValid(username.length >= 5 && password.length >= 3);
  }, [username, password]);

  return (
    <>
      <h1>Login</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength="3"
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Stack direction="horizontal" gap={3} className="mt-3">
          <Button variant="primary" type="submit" disabled={!isFormValid}>
            Login
          </Button>
        </Stack>
      </Form>
      <Row>
        <Col className="mt-3"></Col>
      </Row>
      <Link to='/signup'>Don't have an account yet? <b>Signup now</b></Link>
    </>
  );
};

// Here is where we define all the props constraints
LoginView.propTypes = {
  handleLogin: PropTypes.func.isRequired
};



// 2. Add error handling to the fetch request to handle network errors and server errors.
// 3. Consider adding a loading spinner or progress bar to indicate to the user that the login request is being processed.