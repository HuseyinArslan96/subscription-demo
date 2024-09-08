import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const MessageIcon = () => {

    return (
        <div style={{ position: 'relative', display: 'inline-block' }}>
            <FontAwesomeIcon icon={faEnvelope} size="lg" />
        </div>
    );
};

export default MessageIcon;