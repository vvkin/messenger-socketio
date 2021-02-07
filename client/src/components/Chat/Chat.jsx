import { useEffect } from 'react';
import { io } from 'socket.io-client';

const Chat = ({ baseUrl, user }) => {

    useEffect(() => {
        const socket = io('http://localhost:5000', {withCredentials: true});
        console.log(socket);
    }, []);

    return (
        <div className='chat-wrapper'>
            <h1>{JSON.stringify(user)}</h1>
        </div>
    )
}

export default Chat;