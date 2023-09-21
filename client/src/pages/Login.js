import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Add error state
  const navigate = useNavigate(); // Create a navigate function for redirection

  async function loginUser(event) {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:1337/api/login', {
        email: email,
        password: password
      });

      console.log(response.data.user);
      localStorage.setItem("token", response.data.user);
      const user=atob(response.data.user.split(".")[1])
      const userData = JSON.parse(user);
      sessionStorage.setItem("name",userData.name)
      sessionStorage.setItem("email",userData.email)
      sessionStorage.setItem("tokenVerified",true)

      // Redirect to Dashboard after successful login
      navigate('/');
    } catch (error) {
      console.error(error);
      setErrorMessage('Invalid email or password'); // Display error message
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={loginUser}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => { setEmail(e.target.value) }} /><br />
        <input type="password" placeholder="Password" value={password} onChange={(e) => { setPassword(e.target.value) }} /><br />
        <input type='submit' value="Login" />
      </form>
      {errorMessage && <div>{errorMessage}</div>} {/* Display error message */}
    </div>
  );
}

export default Login;
