import axios from 'axios';
import React, { useState } from 'react'

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
   
    console.log(email)
    console.log(password)
    return axios
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
    <form action='signInForm' onSubmit={handleLogin}>
      <label htmlFor='signInForm-email-input'>Email</label>
      <input type="email"  onChange={(e) => setEmail(e.target.value)} value={email} id="signInForm-email-input"/>
      <br />
      <label htmlFor='signInForm-password-input'>Password</label>
      <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} id="signInForm-password-input"/><br />
      <input type="submit" value="se connecter" />
    </form>
  )
}

export default SignInPage
