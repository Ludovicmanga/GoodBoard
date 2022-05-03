import React from 'react'

const SignInPage = () => {
  return (
    <form action='signInForm'>
      <label htmlFor='signInForm-email-input'>Email</label>
      <input type="email" value="email" id="signInForm-email-input"/>
      <br />
      <label htmlFor='signInForm-password-input'>Password</label>
      <input type="password" value="password" id="signInForm-password-input"/><br />
      <input type="submit" value="se connecter" />
    </form>
  )
}

export default SignInPage
