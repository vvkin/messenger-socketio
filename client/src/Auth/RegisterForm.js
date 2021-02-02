import React, { useState } from 'react';

export default function RegisterForm() {
  const [name, setName] = useState('');
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const baseUrl = 'http://localhost:5000/register/'
    const userData = {
      'name': name,
      'username': username,
      'email': email,
      'password': password
    }
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData) 
    });

    const serverResult = await response.json();
    console.log(serverResult);
  }

  const validateForm = () => {
    return (password === confirmPassword);
  }

  return (
    <div className='register'>
      <form method='POST' onSubmit={handleSubmit}>
        <input
          type='text'
          value={name}
          placeholder='Your name'
          maxlength='128'
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type='text'
          value={username}
          placeholder='Username'
          maxlength='64'
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type='email'
          value={email}
          placeholder='Email'
          maxlength='255'
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type='password'
          value={password}
          placeholder='Password'
          maxlength='30'
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type='password'
          value={confirmPassword}
          placeholder='Confirm password'
          maxlength='30'
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button disabled={!validateForm()}>Submit</button>        
      </form>
    </div>
  )
}
