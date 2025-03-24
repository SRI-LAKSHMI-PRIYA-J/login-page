import { useState } from "react";
import axios from "axios";
import "./Login.css"; // Importing CSS for styling

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // Function to handle login
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form from refreshing the page
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/auth/login/", {
        username,
        password,
      });
      localStorage.setItem("token", response.data.tokens.access); // Store JWT token
      setMessage("Login successful!");
    } catch (error) {
      setMessage("Invalid username or password. Try again.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Login;
