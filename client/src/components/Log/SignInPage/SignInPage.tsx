import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    
    axios
      .post(`http://localhost:5000/users/login`, {
        email,
        password
      }, {withCredentials: true})
      .then(res => {
        if(res.data.formattedErrors) {
          console.log(res.data.formattedErrors)
          /* emailError.innerHTML = res.data.formattedErrors.email;
          passwordError.innerHTML = res.data.formattedErrors.password; */
        } else {
          window.location.href = "/";
        }
      })
      .catch(error => { console.log(error) })
  }
    
  return (
    <div className='logForm-container'>
      <form className='logForm' onSubmit={handleLogin}>
        <div className='logForm--input-container'>
          <input type="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)} value={email} id="signInForm-email-input"/>
        </div>
        <br />
        <div className='logForm--input-container'>
          <input type="password" placeholder='Mot de passe' onChange={(e) => setPassword(e.target.value)} value={password} id="signInForm-password-input"/><br />
        </div>
        <div className='logForm--btn-container'>
          <input className='logForm--btn' type="submit" value="se connecter" />
        </div>
      </form>
    </div>
  )
}

export default SignInPage
