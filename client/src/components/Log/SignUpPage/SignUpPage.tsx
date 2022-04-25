import React from 'react'

const SignUpPage = () => {
  return (
    <form action='signUpForm'>
      <label htmlFor='signUpForm-email-input'>Pseudo</label>
      <input type="pseudo" value="peudo" id="signUpForm-pseudo-input"/>
      <br />
      <label htmlFor='signUpForm-email-input'>Email</label>
      <input type="email" value="email" id="signUpForm-email-input"/>
      <br />
      <label htmlFor='signUpForm-password-input'>Password</label>
      <input type="password" value="password" id="signUpForm-password-input"/>
    </form>
  )
}

export default SignUpPage
