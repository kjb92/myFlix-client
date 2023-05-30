import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';

export const UserInfo = ({ user, token }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

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
        'Content-Type': 'application/json',
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
        setUsername(data.username);
        setPassword(data.password);
        setEmail(data.email);
        setBirthday(data.birthday);
        setUserProfile(data);
        //Somehow "refresh" the view and update the user prop with the updated user details
        //...
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
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response or perform any necessary actions
        console.log('User was deleted successfully:', data);
        alert('User was deleted successfully!');
      })
      .catch(error => {
        console.error('Error deleting user', error);
      });
  };

  //Fetch current user's profile information
  useEffect(() => {
    if (!token) {
      return;
    }

    fetch('https://myflix-kjb92.herokuapp.com/users', {
      method: 'GET',
      headers: { 
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => response.json())
      .then((data) => {
        setUserProfile(data.find((u) => u.username === user.username));
      })
      .catch((error) => {
        console.error('Error fetching user profile:', error);
      });
  }, [userProfile]);  

  // Update the form fields with the user's current profile information
  useEffect(() => {
    if (userProfile) {
      setUsername(userProfile.username);
      setPassword(userProfile.password);
      setEmail(userProfile.email);
      setBirthday(userProfile.birthday);
    }
  }, [userProfile]);

  return (
    <div>
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
        <Button variant="primary" type="submit">
          Update
        </Button>
        <Button variant="danger" onClick={handleDeregister}>
          Deregister
        </Button>
      </Form>
    </div>
  );
};

// Here is where we define all the props constraints
UserInfo.propTypes = {
  user: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      password: PropTypes.string.isRequired,
      favoriteMovies: PropTypes.arrayOf(
        PropTypes.shape({
          _id: PropTypes.string.isRequired
        })
      ).isRequired,
      }).isRequired,
  token: PropTypes.string.isRequired
};