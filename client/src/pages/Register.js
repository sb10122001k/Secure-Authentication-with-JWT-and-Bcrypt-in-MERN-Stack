
import {useState} from 'react';
import axios from 'axios';

function App() {
  const [name,setName] =useState('');
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');

  async function registerUser(event) {
    event.preventDefault()
    axios.post('http://localhost:1337/api/register',
      {
        name:name,
        email:email,
        password:password
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    
    
  }
  return (
    <div>
      <h1>Registration</h1>
      <form onSubmit={registerUser}>
        <input type="text" placeholder="Name" value={name} onChange={(e)=>{setName(e.target.value)}} /><br/>
        <input type="email" placeholder="Email" value={email} onChange={(e)=>{setEmail(e.target.value)}} /><br/>
        <input type="password" placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/><br/>
        <input type='submit' value="Register"/>
      </form>
    </div>
  );
}

export default App;
