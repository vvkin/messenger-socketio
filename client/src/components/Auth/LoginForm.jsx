import React, { useState } from 'react';
import fetchApi from './fetchApi';
import './styles.css';

const LoginForm = ({ baseUrl, setUser }) => {
  const [error, setError] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async event => {
    event.preventDefault();

    const response = await fetchApi(`${baseUrl}/login/`, {
      'login': login,
      'password': password
    });
    const data = await response.json();
    response.ok ? setUser(data.user) : setError(data.error);
  }

  const validateForm  = () => {
    return (login.length && password.length);
  }

  return (
    <div className='login-wrapper'>
      <div className='form-header'>
        <h1>Sign in to Messenger</h1>
      </div>
      {error ? (
        <div className='form-error'>{error}</div>
      ): null}
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