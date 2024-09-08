import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const UserListModal = ({ show, onClose, currentUser, onSelectUser }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/Users`)
            .then(response => {
                // currentUser kontrolü, oturum açan kullanıcı hariç kullanıcı listesini getirir.
                setUsers(response.data.filter(user => user.id !== currentUser.userId));
                // setUsers(response.data)
            })
            .catch(error => {
                console.error('There was an error fetching the users!', error);
            });
    }, [currentUser]);
    console.log("Current User: ", currentUser);

    // const handleSendMessage = async (receiver_id) => {
    //     const messageContent = prompt('Mesajınızı yazın.');
    //     if (!messageContent) return;

    //     try {
    //         const message = {
    //             content: messageContent,
    //             sender_id: currentUser.id,
    //             receiver_id: receiver_id,
    //         };
    //         await axios.post('http://localhost:5000/api/messages', message);
    //         alert('Mesaj başarıyla gönderildi.');
    //     } catch (error) {
    //         console.error('Mesaj gönderilirken bir hata oluştu: ', error);
    //         alert('Mesaj gönderilemedi!');
    //     }
    // };

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Kullanıcılar</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {users.length > 0 ? (
                    <ul className="list-group-item">
                        {users.map(user => (
                            <li key={user.id} className="list-group-item d-flex justify-content-between align-items-center">
                                {user.user_name}
                                <Button variant="link" onClick={() => {
                                    onSelectUser(user); // Kullanıcıyı seç
                                    onClose(); // Modalı kapat.
                                    // handleSendMessage(user.id); // Mesaj gönder
                                }}>
                                    <FontAwesomeIcon icon={faEnvelope} />
                                </Button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Mesaj gönderilebilecek kullanıcı yok.</p>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>Kapat</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UserListModal;
