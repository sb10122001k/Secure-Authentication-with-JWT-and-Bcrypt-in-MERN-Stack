// useTokenVerification.js

import { useState, useEffect } from 'react';
import axios from 'axios';
const useTokenVerification = () => {
  const [isValidToken, setIsValidToken] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem('token');
    const sessionToken=sessionStorage.getItem('tokenVerified')  
    console.log(sessionToken)
    if(sessionToken)
    {
      setIsValidToken(true)
    }
    else if (token) {
      console.log("Here 2")
      axios.post('http://localhost:1337/api/verify-token', { token })
        .then(response => setIsValidToken(response.data.isValid))
        .catch(error => setIsValidToken(false));
    } else {
      setIsValidToken(false);
    }
  }, []);
  return isValidToken;
}

export default useTokenVerification;
