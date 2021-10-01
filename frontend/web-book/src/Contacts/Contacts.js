import React, { useState, useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import axios from '../axios.config';

const Contacts = () => {
  const [contacts, setContacts] = useState([]);

  const getContacts = async () => {
    const contacts = await axios.get('/contacts');
    setContacts(contacts.data);
  };

  useEffect(() => {
    getContacts();
  }, []);
  return (
    <Container>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {contacts?.map((contact) => (
            <tr key={contact.contactId}>
              <td>{contact.firstName}</td>
              <td>{contact.lastName}</td>
              <td>{contact.email}</td>
              <td></td>
            </tr>
            )
          )}
        </tbody>
      </Table>
    </Container>
  );

}

export default Contacts;