import React, { useState } from 'react';

export default function LoginForm() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    const url = 'http://localhost:5000/login/'
    const credentials = {
      'login': login,
      'password': password
    }
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });

    if (response.ok) {
      const userData = await response.json();
      console.log(userData);
    } else {
      console.log('Ooops');
    }
  }

  function validateForm() {
    return login.length > 0 && password.length > 0;
  }

  return (
    <div className='login'>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={login}
          placeholder='Username or email'
          onChange={(e) => setLogin(e.target.value)}
        />
        <input 
          type='password' 
          value={password} 
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button disabled={!validateForm()}>Login</button>
      </form>
    </div>
  )
}
