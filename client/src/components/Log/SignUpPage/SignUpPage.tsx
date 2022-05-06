import axios from 'axios';
import React, { useState } from 'react'
import SignInPage from '../SignInPage/SignInPage';

const SignUpPage = () => {
  const [formSubmit, setFormSubmit] = useState(false);
  const [pseudo, setPseudo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    
    axios
      .post(`http://localhost:5000/users/sign-up`, {
        email,
        password,
        pseudo,
        type: "user"
      }, {withCredentials: true})
      .then(res => {
        if(res.data.formattedErrors) {
          console.log(res.data.formattedErrors)
          /* emailError.innerHTML = res.data.formattedErrors.email;
          passwordError.innerHTML = res.data.formattedErrors.password; */
        } else {
          setFormSubmit(() => true);
        }
      })
      .catch(error => { console.log(error) })
  }
  

  return (
    <>
      { formSubmit ? (
        <>
          <SignInPage />
          <span></span>
          <h4 className='success'>Enregistrement réussi, veuillez vous connecter</h4>
        </> 
      ):
      <form action='signUpForm' onSubmit={handleRegister}>
        <label htmlFor='signUpForm-email-input'>Pseudo</label>
        <input type="pseudo" value={pseudo} onChange={ (e) => setPseudo(e.target.value)} id="signUpForm-pseudo-input"/>
        <br />
        <label htmlFor='signUpForm-email-input'>Email</label>
        <input type="email" onChange={ (e) => setEmail(e.target.value)} value={email} id="signUpForm-email-input"/>
        <br />
        <label htmlFor='signUpForm-password-input'>Password</label>
        <input type="password" onChange={ (e) => setPassword(e.target.value)} value={password} id="signUpForm-password-input"/><br />
        <input type="submit" value="s'inscrire" />
      </form>
    }
    </>
  )
}

export default SignUpPage
