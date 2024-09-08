import React, { useState } from 'react';
import styles from './cssFile/MessageForm.module.css'; // Stil dosyasını dahil ediyoruz

const MessageForm = ({ onSendMessage }) => {
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim()) {
            onSendMessage(message);
            setMessage('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
                <textarea
                    className={styles.messageInput}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Mesajınızı yazın."
                />
                <button type="submit" className={styles.sendButton}>Gönder</button>
            </div>
        </form>
    )
};

export default MessageForm;