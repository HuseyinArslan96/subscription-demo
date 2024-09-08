import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const MessageIconWithCount = ({ user_id }) => {
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        const fetchUnreadCount = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/messages/${user_id}/unreadcount`);
                setUnreadCount(response.data);
            } catch (error) {
                console.error('Error fetching unread messages count', error);
            }
        };

        fetchUnreadCount();
    }, [user_id]);

    return (
        <div style={{ position: 'relative', display: 'inline-block' }}>
            <FontAwesomeIcon icon={faEnvelope} size="lg" />
            {unreadCount > 0 && (
                <span style={{
                    position: 'absolute',
                    top: '-5px',
                    right: '-10px',
                    background: 'red',
                    color: 'white',
                    borderRadius: '50%',
                    padding: '2px 6px',
                    fontSize: '12px',
                }}>
                    {unreadCount}
                </span>
            )}
        </div>
    );
};

export default MessageIconWithCount;