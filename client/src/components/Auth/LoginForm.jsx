import React, { useState } from 'react'
import './styles.css'

const LoginForm = ({ baseUrl, setUser }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const apiUrl = baseUrl + '/login/';
    const credentials = {
      'login': login,
      'password': password
    };
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });

    if (response.ok) {
      const userData = await response.json();
      setUser(userData);
    } else {
      showError();
    }
  }

  const validateForm  = () => {
    return (login.length && password.length)
  }

  const showError = () => {
    console.log('Incorrect login or password');
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
            <a href='#'>Forgot password?</a>
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

export default LoginForm