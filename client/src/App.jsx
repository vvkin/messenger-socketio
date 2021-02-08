import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ProvideAuth } from './helpers/use-auth';
import PrivateRoute from './helpers/PrivateRoute';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';
import Chat from './components/Chat/Chat';

const App = () => (
  <ProvideAuth>
    <BrowserRouter>
      <Switch>
        <Route path='/login' component={LoginForm} />
        <Route path='/register' component={RegisterForm} />                
        <PrivateRoute path='/' component={Chat} />
      </Switch>
    </BrowserRouter>
  </ProvideAuth>
);

export default App;