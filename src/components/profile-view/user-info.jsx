import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import Stack from 'react-bootstrap/Stack';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export const UserInfo = ({ user, token }) => {
  const [username, setUsername] = useState(`${user.username}`);
  const [password, setPassword] = useState(`${user.password}`);
  const [email, setEmail] = useState(`${user.email}`);
  const [birthday, setBirthday] = useState(`${user.birthday.split("T")[0]}`);

  const updateUserProfile = (e) => {
    e.preventDefault();

    const updatedUserData = {
      username: username,
      password: password,
      email: email,
      birthday: birthday
    };
  
    fetch(`https://myflix-kjb92.herokuapp.com/users/${user.username}`, {
      method: 'PUT',
      headers: {
        "Content-Type" : "application/JSON",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(updatedUserData)
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response or perform any necessary actions
        console.log('User profile updated successfully:', data);
        alert('User profile updated successfully!');
        // Update the state variables with the updated data
        localStorage.setItem("user", JSON.stringify(data));
      })
      .catch(error => {
        console.error('Error updating user profile:', error);
      });
  };
    
  const handleDeregister = (e) => {
    e.preventDefault();
  
    fetch(`https://myflix-kjb92.herokuapp.com/users/${user.username}`, {
      method: 'DELETE',
      headers: {
        "Content-Type" : "application/JSON",
        Authorization: `Bearer ${token}`
      }
    })
      .then(data => {
        // Handle the response or perform any necessary actions
        console.log('User was deleted successfully:', data);
        alert('User was deleted successfully!');
        localStorage.clear();
        window.location.reload();
      })
      .catch(error => {
        console.error('Error deleting user', error);
      });
  };

  return (
    <Col>
      <Form onSubmit={updateUserProfile}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formDateOfBirth">
          <Form.Label>Birthday</Form.Label>
          <Form.Control
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
          />
        </Form.Group>
        <Stack direction="horizontal" gap={3} className="mt-3">
          <Button variant="primary" type="submit">
            Update
          </Button>
          <Button variant="danger" onClick={handleDeregister}>
            Deregister
          </Button>
        </Stack>
      </Form>
    </Col>
  );
};

// Here is where we define all the props constraints
// UserInfo.propTypes = {
//   user: PropTypes.shape({
//       _id: PropTypes.string.isRequired,
//       username: PropTypes.string.isRequired,
//       email: PropTypes.string.isRequired,
//       password: PropTypes.string.isRequired,
//       favoriteMovies: PropTypes.arrayOf(PropTypes.string.isRequired)
//       .isRequired,
//       }).isRequired,
//   token: PropTypes.string.isRequired
// };