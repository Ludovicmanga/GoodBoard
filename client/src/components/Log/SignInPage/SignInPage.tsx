import React from 'react'

const SignInPage = () => {
  return (
    <form action='signInForm'>
      <label htmlFor='signInForm-email-input'>Email</label>
      <input type="email" value="email" id="signInForm-email-input"/>
      <br />
      <label htmlFor='signInForm-password-input'>Password</label>
      <input type="password" value="password" id="signInForm-password-input"/>
    </form>
  )
}

export default SignInPage
