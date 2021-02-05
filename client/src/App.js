import LoginForm from './components/auth/login-form';
import RegisterForm from './components/auth/register-form'

function App() {
  return (
    <RegisterForm baseUrl = 'http://localhost:5000' />
  );
}

export default App;
