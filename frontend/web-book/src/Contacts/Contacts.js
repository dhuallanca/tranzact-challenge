import React, { useState, useEffect } from 'react';
import { Button, Card, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router";
import axios from '../axios.config';
import './Contacts.css';

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

  const goToUpdate = (id) => {
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
    <Card border="secondary">
      <Card.Header>
        Contacts
      </Card.Header>
      <Card.Body>
        <Link to="/Contact">Add contact</Link>
        <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {contacts?.map((contact) => (
            <tr key={contact.contactId}>
              <td>{contact.firstName}</td>
              <td>{contact.lastName}</td>
              <td>{contact.email}</td>
              <td className="td-center-align"><Button onClick={() => goToUpdate(contact.contactId)}>
                    Edit
                  </Button>
              </td>
              <td className="td-center-align"><Button variant="danger" onClick={() => handleDelete(contact.contactId)}>
                    Delete
                  </Button>
              </td>
            </tr>
            )
          )}
        </tbody>
      </Table>

      </Card.Body>
    </Card>
  );

}

export default Contacts;