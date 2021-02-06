import { useState, useEffect } from 'react';
import LoginForm from '../Auth/LoginForm';
import Chat from '../Chat/Chat';

const App = () => {
    const baseUrl = 'http://localhost:5000';
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch(`${baseUrl}/get-user/`, {credentials: 'include'})
            .then(res => res.ok ? res.json() : null)
            .then(data => setUser(data.user));
    }, []);

    if (!user) {
        return <LoginForm baseUrl={baseUrl} setUser={setUser} />
    } else {
        return <Chat user={user} />
    }
}

export default App;