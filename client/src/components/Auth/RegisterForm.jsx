import React, { useState } from 'react';
import fetchApi from './fetchApi';
import './styles.css';

const RegisterForm  = ({ baseUrl }) => {
  const [name, setName] = useState('');
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async event => {
    event.preventDefault();

    const response = await fetchApi(`${baseUrl}/register/`, {
      'name': name,
      'username': username,
      'email': email,
      'password': password
    });
    const data = await response.json();
    response.ok ? console.log('OK') : showError(data.error);
  }

  const validateForm = () => {
    return (username.length);
  }
  
  const showError = error => {
    console.log(error);
  };

  return (
    <div className='register-wrapper'>
      <div className="form-header">
        <h1>Sign up to Messenger</h1>
      </div>
      <div className="form-error" />
      <div className="form-body">
        <form onSubmit={handleSubmit}>
          <label htmlFor='name'>Name</label>
          <input id='name'
                type='text'
                value={name}
                maxlength='128'
                required
                onChange={(e) => setName(e.target.value)} />
          <label htmlFor="username">Username</label>
          <input id='username'
                type='text'
                value={username}
                maxlength='64'
                required
                onChange={(e) => setUserName(e.target.value)} />
          <label htmlFor="email_field">Email</label>
          <input id='email_field'
                type='email'
                value={email}
                maxlength='255'
                required
                onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="passwd_field">Password</label>
          <input id='passwd_field'
                type='password'
                value={password}
                maxlength='30'
                required
                onChange={(e) => setPassword(e.target.value)}
          />
          <button disabled={!validateForm()}>Sign up</button>        
        </form>
      </div>
    </div>
  )
}

export default RegisterForm;
