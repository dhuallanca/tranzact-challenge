import React, { useState, useEffect } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router";
import axios from '../axios.config';

const Contacts = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    getContacts();
  }, []);

  const history = useHistory();

  const getContacts = async () => {
    const contacts = await axios.get('/contacts');
    setContacts(contacts.data);
  };

  const goToUpdate = (id)=> {
    history.push(`/Contact/${id}`);
  }

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    const result = await axios.delete(`/contacts/${id}`)
      .catch((error) => {

      });

    if (result?.status === 200) {
      getContacts();
    }
  }

  return (
    <Container>
      <Link to="/Contact">Add contact</Link>
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
              <td><Button onClick={() => goToUpdate(contact.contactId)}>
                    Edit
                  </Button>
              </td>
              <td><Button variant="danger" onClick={() => handleDelete(contact.contactId)}>
                    Delete
                  </Button>
              </td>
            </tr>
            )
          )}
        </tbody>
      </Table>
    </Container>
  );

}

export default Contacts;