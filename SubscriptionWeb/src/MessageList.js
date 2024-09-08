import React, { useEffect, useState } from 'react';

const MessageList = ({ user_id }) => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchMessages = async () => {
            const response = await fetch('api/messages/$(user_id)');
            const data = await response.json();
            setMessages(data);
        };
        fetchMessages();
    }, [user_id]);

    return (
        <div>
            <h2>Mesajlar</h2>
            <ul>
                {messages.map((msg) => (
                    <li key={msg.id}>
                        <strong>{msg.sender_id === user_id ? 'Siz' : 'Gönderen'}</strong>: {msg.content}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MessageList;