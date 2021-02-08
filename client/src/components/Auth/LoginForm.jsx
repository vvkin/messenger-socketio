import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../helpers/use-auth';
import './styles.css';

const LoginForm = props => {
  const auth = useAuth();
  const [error, setError] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = event => {
    event.preventDefault();

    auth.login({ login, password })
      .then(() => props.history.push('/'))
      .catch(response => {
        response.json().then(({ error }) => {
          setError(error)
        })
      })
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
      <div className="redirect">
        <Link to='/register'>Sign up</Link>
      </div>
    </div>
  )
}

export default LoginForm;