import { useState } from "react";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const handleSubmit = (event) => {
    // this prevents the default behaviour of the form which is to reload the entire page
    event.preventDefault();

    const data = {
      username: username, 
      password: password
    };

    fetch('https://myflix-kjb92.herokuapp.com/login', {
      method: "POST",
      body: JSON.stringify(data)
    }).then((response) => {
      if (response.ok) {
        onLoggedIn(username);
      } else {
        alert("Login failed"); 
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username: 
        <input 
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        />
      </label>
      <label>
        Password:
        <input type="password" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};