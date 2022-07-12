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
        type: "user",
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
      ) :
      <div className='logForm-container'>
        <form className='logForm' onSubmit={handleRegister}>
          <div className='logForm--input-container'>
            <input type="pseudo" placeholder='Pseudo' value={pseudo} onChange={ (e) => setPseudo(e.target.value)} className="logForm-pseudo-input"/>
          </div>
          <br />
          <div className='logForm--input-container'>
            <input type="email" placeholder='Email' onChange={ (e) => setEmail(e.target.value)} value={email} className="logForm-email-input"/>
          </div>
          <br />
          <div className='logForm--input-container'>
            <input type="password" placeholder='Mot de passe' onChange={ (e) => setPassword(e.target.value)} value={password} className="logForm-password-input"/><br />
          </div>
          <div className='logForm--btn-container'>
            <input className='logForm--btn' type="submit" value="s'inscrire" />
          </div>      
        </form>
      </div>
    }
    </>
  )
}

export default SignUpPage
