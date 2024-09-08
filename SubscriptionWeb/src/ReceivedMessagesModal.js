import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

const ReceivedMessagesModal = ({ show, onClose, currentUser }) => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (currentUser) {
            axios.get(`http://localhost:5000/api/messages/${currentUser.userId}`)
                .then(response => {
                    setMessages(response.data);
                })
                .catch(error => {
                    console.error('There was an error fetching the message: ', error);
                });
        }
    }, [currentUser]);

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Gelen Mesajlar</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {messages.length > 0 ? (
                    <ul className="list-group">
                        {messages.map(msg => (
                            <li key={msg.id} className="list-group-item">
                                <strong>{msg.sender_id === currentUser.userId ? 'You' : `${msg.sender_name}`}</strong>: {msg.message}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Gelen mesaj yok.</p>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>Kapat</Button>
            </Modal.Footer>
        </Modal>
    )
};

export default ReceivedMessagesModal;