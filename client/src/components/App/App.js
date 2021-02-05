import useUser from './useStorage';
import LoginForm from '../Auth/LoginForm';

function App() {
  const [user, setUser] = useUser(null);

  if (!user) {
    return <LoginForm baseUrl = 'http://localhost:5000' setUser = {setUser}/>
  }

  return (
    <h1>
     {JSON.stringify(user)}
    </h1>
  )
}

export default App;
