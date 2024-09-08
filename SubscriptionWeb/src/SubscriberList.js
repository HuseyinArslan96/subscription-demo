import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

function SubscriberList() {
  const [subscribers, setSubscribers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/Subscribers')
      .then(response => {
        setSubscribers(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the subscribers!', error);
      });
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center">Subscriber List</h1>
      {subscribers.length > 0 ? (
        <ul className="list-group">
          {subscribers.map(subscriber => (
            <li key={subscriber.id} className="list-group-item">
              {subscriber.subscriber_name} - {subscriber.company_name}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center">No subscribers available.</p>
      )}
    </div>
  );
}

export default SubscriberList;
