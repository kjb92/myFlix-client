import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Stack from 'react-bootstrap/Stack';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link } from "react-router-dom";
import { baseURL } from '../../../lib/config';

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  //Validation rules
  const isEmailValid = email.length === 0 || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPasswordValid = password.length === 0 || password.length >= 6;

  //Handle signup submit
  const handleSubmit = (event) => {
    // this prevents the default behaviour of the form which is to reload the entire page
    event.preventDefault();
    setIsLoading(true);

    const data = {
      username: username,
      email: email, 
      password: password,
      birthday: birthday
    };

    fetch(`${baseURL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then((response) => {
      if (response.ok) {
        alert("Signup successful");
        window.location.reload();
      } else if (response.status === 409) {
        alert("Username or email already exists");
      } else {
        alert("Signup failed");
      }
    })
    .catch((error) => {
      console.error("Signup error: ", error);
      alert("Something went wrong: ", error);
    })
    .finally(() => {
      setIsLoading(false);
  });
};


  //Form validation
  useEffect(() => {
    setIsFormValid(
      username.length >= 5 &&
      isEmailValid &&
      isPasswordValid &&
      birthday.length > 0
    );
  }, [username, email, password, birthday, isEmailValid, isPasswordValid]);

  return (
    <>
      <h1>Signup</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength="5"
          />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            isInvalid={!isEmailValid}
          />
          <Form.Control.Feedback type="invalid">
            Please enter a valid email address.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            isInvalid={!isPasswordValid}
          />
          <Form.Control.Feedback type="invalid">
            Password must be at least 6 characters long.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formBirthday">
          <Form.Label>Birthday:</Form.Label>
          <Form.Control
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            required
          />
        </Form.Group>
        <Stack direction="horizontal" gap={3} className="mt-3">
        <Button variant="primary" type="submit" disabled={!isFormValid || isLoading}>
          {isLoading ? "Signing up..." : "Signup"}
        </Button>
        </Stack>
      </Form>
      <Row>
        <Col className="mt-3"></Col>
      </Row>
      <Link to='/login'>Already have an account? <b>Login now</b></Link>
    </>
  );
};