import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Stack from 'react-bootstrap/Stack';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link } from "react-router-dom";

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState("");
  
  const handleSubmit = (event) => {
    // this prevents the default behaviour of the form which is to reload the entire page
    event.preventDefault();

    const data = {
      username: username,
      email: email, 
      password: password,
      birthday: birthday
    };

    fetch('https://myflix-kjb92.herokuapp.com/users', {
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
      } else {
        alert("Signup failed"); 
      }
    })
    .catch((e) => {
      alert("Something went wrong");
    });
  };

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
          <Button variant="primary" type="submit">
            Signup
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

//  improvements

// Line 40: Remove the unused variable e to avoid the warning.
// Lines 23-35: Add error handling to the fetch request to provide more specific error messages to the user.
// Lines 41-51: Add client-side validation to the form fields to ensure that the email is in a valid format and that the password meets specific requirements.