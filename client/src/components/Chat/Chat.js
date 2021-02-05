const Chat = ({ user }) => {
    return (
        <div className='chat-wrapper'>
            <h1>{JSON.stringify(user)}</h1>
            {console.log(user)}
        </div>
    )
}

export default Chat;