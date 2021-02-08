import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from '../../helpers/use-auth';

const Chat = ({ baseUrl, user }) => {
    const auth = useAuth();

    useEffect(() => {
        const socket = io('http://localhost:5000');
        
        socket.on('connect', () => console.log('connected!'));

        return () => socket.disconnect();
    }, []);

    return (
        <div className='chat-wrapper'>
            <h1>{JSON.stringify(auth.user)}</h1>
        </div>
    )
}

export default Chat;