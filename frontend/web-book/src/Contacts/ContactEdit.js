import { useEffect, useState } from 'react';
import axios from '../axios.config';
import { useParams } from "react-router";
import { Alert, Button, Card, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Contacts.css';

const ContactEdit = () => {
  const initialContact = {};
  const [contact, setContact] = useState(initialContact);
  const [succeed, setSucceed] = useState(false);
  const params = useParams();
  const contactId = params?.id;

  useEffect(() => {
    getContact(contactId);
  }, [contactId]);

  const getContact = async (id) => {
    const contacts = await axios.get(`/contacts/${id}`);
    setContact(contacts.data);
  };

  const handleOnChange = (field, value) => {
    setContact({
      ...contact,
      [field]: value
    });
  }

  const handleSave = () => {
    if (contact?.contactId) {
      updateContacts(contact.contactId);
      return;
    }
    addContacts();
  }

  const updateContacts = async (id) => {
    const result = await axios.put(`/contacts/${id}`, contact)
      .catch((error) => {
        setSucceed(false);
      });

    if (result?.status === 200) {
      setSucceed(true);
    }
  };

  const addContacts = async () => {
    const result = await axios.post(`/contacts`, contact)
      .catch((error) => {
        setSucceed(false);
      });

    if (result?.status === 200) {
      setSucceed(true);
    }
  };

  if (succeed) {
    return (
      <Alert  variant='success'>
        Contact Successfully Saved!
        <br />
        <hr/>
        <Alert.Link href="/">Contacts List</Alert.Link>
      </Alert>
    )
  }

  return (
    <Card border="secondary">
      <Card.Header>Contact</Card.Header>
      <Card.Body>
        <Form>
        <Form.Group className="mb-3" controlId="formFirstName">
          <Form.Label>First name</Form.Label>
          <Form.Control type="text"
            placeholder="Enter First name"
            value={contact?.firstName}
            onChange={e => handleOnChange('firstName', e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text"
            placeholder="Enter Last name"
            value={contact?.lastName}
            onChange={e => handleOnChange('lastName', e.target.value)}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email"
            placeholder="name@domain.com"
            value={contact?.email}
            onChange={e => handleOnChange('email', e.target.value)}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control type="text"
            placeholder="Enter Address"
            value={contact?.address}
            onChange={e => handleOnChange('address', e.target.value)}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPhone">
          <Form.Label>Phone number</Form.Label>
          <Form.Control type="text"
            placeholder="Enter Phone number"
            value={contact?.phone}
            onChange={e => handleOnChange('phone', e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="button" onClick={handleSave}>
          Save
          </Button>
          <Link to="/"> Back</Link>
      </Form>
      </Card.Body>
    </Card>
  );
}
export default ContactEdit;