import { Redirect, Route } from 'react-router-dom';
import { useAuth } from './use-auth';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const auth = useAuth();
  
  return (
    <Route
      {...rest}
      render={props =>
        auth.user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  )
}

export default PrivateRoute;