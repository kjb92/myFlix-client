import { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import Stack from 'react-bootstrap/Stack';
import Col from 'react-bootstrap/Col';
import { baseURL } from '../../../lib/config';

export const UserInfo = ({ user, token, updateUser }) => {
  const [username, setUsername] = useState(`${user.username}`);
  const [password, setPassword] = useState(``);
  const [email, setEmail] = useState(`${user.email}`);
  const [birthday, setBirthday] = useState(`${user.birthday.split("T")[0]}`);

  //Update user profile
  const updateUserProfile = (e) => {
    e.preventDefault();

    const updatedUserData = {
      username: username,
      password: password,
      email: email,
      birthday: birthday
    };
  
    fetch(`${baseURL}/users/${user.username}`, {
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
        updateUser(data);
      })
      .catch(error => {
        console.error('Error updating user profile:', error);
      });
  };
    
  //Handel deregister
  const handleDeregister = (e) => {
    e.preventDefault();
  
    fetch(`${baseURL}/users/${user.username}`, {
      method: 'DELETE',
      headers: {
        "Content-Type" : "application/JSON",
        Authorization: `Bearer ${token}`
      }
    })
      .then(data => {
        // Handle the response or perform any necessary actions
        updateUser(data);
        localStorage.clear();
        console.log('User was deleted successfully:', data);
        alert('User was deleted successfully!');
        window.location.reload();
      })
      .catch(error => {
        console.error('Error deleting user', error);
      });
  };

  //Render view
  return (
    <Col>
      <Form onSubmit={updateUserProfile}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            pattern="[a-zA-Z0-9]+"
            required
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formDateOfBirth">
          <Form.Label>Birthday</Form.Label>
          <Form.Control
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            required
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
UserInfo.propTypes = {
  user: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      password: PropTypes.string.isRequired,
      favoriteMovies: PropTypes.arrayOf(PropTypes.string.isRequired)
      .isRequired,
      }).isRequired,
  token: PropTypes.string.isRequired,
  updateUser: PropTypes.func.isRequired
};