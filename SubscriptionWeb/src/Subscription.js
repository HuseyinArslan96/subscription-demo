import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import UserListModal from './UserListModal';
import ReceivedMessagesModal from './ReceivedMessagesModal';
import MessageIconWithCount from './MessageIconWithCount';
import MessageForm from './MessageForm';
import MessageIcon from './MessageIcon';

function Subscription() {
  const location = useLocation();
  console.log("Location state: ", location.state);
  const navigate = useNavigate();
  const [user, setUser] = React.useState(location.state?.user);
  const [showMessageModal, setShowMessageModal] = useState(false); // Mesaj göndermek için
  const [showReceivedMessagesModal, setShowReceivedMessagesModal] = useState(false); // Gelen mesajları görüntülemek için
  const [selectedUser, setSelectedUser] = useState(null);
  const [unreadMessage, setUnreadMessage] = useState(0);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!user) {
      alert('No user data to submit');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/Subscribers', {
        subscriber_id: user.userId,
        subscriber_name: user.userName,
        company_name: user.companyName
      });

      if (response.status === 200 || response.status === 201) {
        alert('Subscriber added successfully!');
      } else {
        alert('Failed to add subscriber with status: ' + response.status);
      }
    } catch (error) {
      console.error('Failed to add subscriber: ', error);
      alert('Failed to add subscriber!');
    }
  };

  const handleSendMessage = async (message) => {
    if (!selectedUser) {
      alert('Lütfen mesaj göndermek için bir kullanıcı seçin.');
      return;
    }
    try {
      const msg = {
        message: message,
        sender_id: user.userId,
        receiver_id: selectedUser.user_id,
        sender_name: user.userName,
        receiver_name: selectedUser.user_name,
        sent_at: new Date().toISOString(),
        is_read: false
      };
      console.log("Mesaj: ", msg);
      console.log("User: ", user);
      console.log("Selected User: ", selectedUser);
      await axios.post('http://localhost:5000/api/messages', msg);
      alert('Mesaj başarıyla gönderildi.');
      setShowMessageModal(false); // Mesaj gönderildikten sonra formu kapat
    } catch (error) {
      console.error('Mesaj gönderilirken bir hata oluştu:', error);
      alert('Mesaj gönderilemedi!');
    }
  };

  const handleLogout = async () => {
    if (!user) {
      alert('The user already do not exist.');
      navigate('/login');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/api/Users/logout');
      if (response.status === 200) {
        alert('You have been logged out.');
        setUser(null); // Kullanıcı bilgilerini temizle
        navigate('/login'); // Logout sonrası login sayfasına yönlendirme
      } else {
        alert('Failed to logout with status: ' + response.status);
      }
    } catch (error) {
      console.error('Logout failed: ', error);
      alert('Logout failed!');
    }
  };

  useEffect(() => {
    const fetchUnreadMessage = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/messages/${user.userId}/unreadcount`);
            setUnreadMessage(response.data);
        } catch (error) {
            console.error('Error fetching unread messages count', error);
        }
    };

    fetchUnreadMessage();
}, [user.userId]);

  const markRead = async () => {
    try {
      console.log("Marking messages as read for user: ", user.userId);
      const response = await axios.put(`http://localhost:5000/api/messages/${user.userId}/markread`);
      console.log("MarkRead response: ", response.data);
      setUnreadMessage(0); //Mesajlar okundu, unReadMessage'ı sıfırla.
    } catch (error) {
      console.error('Error marking messages as read', error)
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Subscription Page</h1>
      {user ? (
        <div>
          <p>Welcome: {user.userName}</p>
          <p>Your company: {user.companyName}</p>
        </div>
      ) : (
        <p className="text-center">No user data available.</p>
      )}
      <form onSubmit={handleSubmit}>
        <button type="submit" className="btn btn-primary btn-block">Subscribe</button>
      </form>
      <form onSubmit={handleSendMessage}>
        <button type="button" onClick={() => setShowMessageModal(true)} className="btn-primary btn-block mt-3">
          <MessageIcon /> {/* Mesaj ikonu */}
          Send Message
        </button> {/* Mesaj gönderme butonu */}
      </form>
      <button onClick={() => {
        setShowReceivedMessagesModal(true);
        markRead();
      }}
        className="btn btn-success btn-block mt-3">Received Messages
        <span style={{ marginLeft: '10px' }}>
          <MessageIconWithCount user_id={user?.userId} />
        </span>
      </button>
      <button onClick={handleLogout} className="btn btn-danger btn-block mt-3" style={{ marginLeft: '20px' }}>Logout</button>

      <UserListModal
        show={showMessageModal}
        onClose={() => setShowMessageModal(false)}
        currentUser={user}
        onSelectUser={setSelectedUser}
      />

      {selectedUser && (
        <MessageForm onSendMessage={handleSendMessage} />
      )}

      <ReceivedMessagesModal
        show={showReceivedMessagesModal}
        onClose={() => setShowReceivedMessagesModal(false)}
        currentUser={user}
      />
    </div>
  );
}

export default Subscription;
