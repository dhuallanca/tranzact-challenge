import { render, screen } from '@testing-library/react';
import App from './App';
import axios from './axios.config'
import { act } from "react-dom/test-utils";

jest.mock('./axios.config.js', () => ({
  get: jest.fn().mockResolvedValue(),
  create: jest.fn()
}));

describe('App testing', () => {

  beforeEach(async () => {
    await act(async () => {
      axios.get.mockResolvedValueOnce({ data: [] });
    });
  });

  test('renders learn react link', () => {
    render(<App />);
  });

});
