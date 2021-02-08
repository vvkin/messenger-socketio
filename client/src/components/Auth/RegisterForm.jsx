import React, { useState } from 'react';
import { useAuth } from '../../helpers/use-auth';
import './styles.css';

const RegisterForm = (props) => {
  const auth = useAuth();
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async event => {
    event.preventDefault();

    auth.register({ name, username, email, password})
      .then(() => props.history.push('/login'))
      .catch(response => {
        response.json().then(({ error }) => {
          setError(error)
        })
      });
  }

  const validateForm = () => {
    return (username.length);
  }
  
  return (
    <div className='register-wrapper'>
      <div className="form-header">
        <h1>Sign up to Messenger</h1>
      </div>
      {error ? (
        <div className='form-error'>{error}</div>
      ): null}
      <div className="form-body">
        <form onSubmit={handleSubmit}>
          <label htmlFor='name'>Name</label>
          <input id='name'
                type='text'
                value={name}
                maxLength='128'
                required
                onChange={(e) => setName(e.target.value)} />
          <label htmlFor="username">Username</label>
          <input id='username'
                type='text'
                value={username}
                maxLength='64'
                required
                onChange={(e) => setUserName(e.target.value)} />
          <label htmlFor="email_field">Email</label>
          <input id='email_field'
                type='email'
                value={email}
                maxLength='255'
                required
                onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="passwd_field">Password</label>
          <input id='passwd_field'
                type='password'
                value={password}
                maxLength='30'
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
