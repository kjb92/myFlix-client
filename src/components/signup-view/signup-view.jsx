import { useState } from "react";

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
        Email: 
        <input 
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        />
      </label>
      <label>
        Password:
        <input 
        type="password" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        />
      </label>
      <label>
        Birthday:
        <input 
        type="date" 
        value={birthday}
        onChange={(e) => setBirthday(e.target.value)}
        required
        />
      </label>
      <button type="submit">Signup</button>
    </form>
  );
};