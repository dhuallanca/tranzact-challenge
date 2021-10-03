import React from 'react';
import { shallow, mount, render } from 'enzyme';
import toJson from 'enzyme-to-json';
import axios from '../axios.config'
import { BrowserRouter } from 'react-router-dom';
import { act } from "react-dom/test-utils";
import Contacts from './Contacts';

const contactList = [
  {
    contactId: 1,
    firstName: 'Dennis',
    lastName: 'Huallanca',
    email: '',
    address: '',
    phone: ''
  },
  {
    contactId: 2,
    firstName: 'Cesar',
    lastName: 'Gomez',
    email: '',
    address: '',
    phone: ''
  }
]

jest.mock('../axios.config.js', () => ({
  get: jest.fn().mockResolvedValue(),
  create: jest.fn()
}));

describe('Contacts testing', () => {

  let wrapper;

  beforeEach(async () => {
    await act(async () => {
      axios.get.mockResolvedValueOnce({ data: contactList });
      wrapper = mount(<BrowserRouter><Contacts></Contacts></BrowserRouter>);
    });
  });

  it('fetches successfully contacts from API', async () => {
    wrapper.update();
    wrapper.find('button').at(0).simulate('click');
    expect(wrapper.find('button').at(0).text()).toEqual('Edit');
  });

  it('match table', async () => {
    expect(toJson(wrapper.html())).toMatchSnapshot();
  });
})