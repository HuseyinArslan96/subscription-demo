import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

function CompanyList() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/Companies')
      .then(response => {
        setCompanies(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the Companies!', error);
      });
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center">Company List</h1>
      {companies.length > 0 ? (
        <ul className="list-group">
          {companies.map(company => (
            <li key={company.id} className="list-group-item">
              {company.manager_name} - {company.company_name}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center">No companies available.</p>
      )}
    </div>
  );
}

export default CompanyList;
