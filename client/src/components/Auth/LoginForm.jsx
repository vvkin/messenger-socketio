import React, { useState } from 'react'
import './styles.css'

const LoginForm = ({ baseUrl, setUser }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = event => {
    event.preventDefault();

    fetch(`${baseUrl}/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          'login': login,
          'password': password
        })
    }).then(res => res.ok ? res.json() : Promise.reject(res))
      .then(data => setUser(data.user))
      .catch(res => res.json().then(data => showError(data.error)))
  }

  const validateForm  = () => {
    return (login.length && password.length);
  }

  const showError = error => {
    console.log(error);
  }

  return (
    <div className='login-wrapper'>
      <div className='form-header'>
        <h1>Sign in to Messenger</h1>
      </div>
      <div className='form-error' />
      <div className='form-body'>
        <form onSubmit={handleSubmit}>
          <label htmlFor='login_field'>Username or email address</label>
          <input id='login_field'
                 type='text'
                 maxLength='255'
                 required
                 onChange={(e) => setLogin(e.target.value)} />
          <label htmlFor='password_field'>
            Password
            <a href='/'>Forgot password?</a>
          </label>
          <input id='password_field'
                 type='password'
                 maxLength='30'
                 required
                 onChange={(e) => setPassword(e.target.value)} />
          <button disabled={!validateForm()}>Sign in</button>
        </form>
      </div>
    </div>
  )
}

export default LoginForm;