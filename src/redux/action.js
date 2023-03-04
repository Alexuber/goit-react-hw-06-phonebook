import { nanoid } from 'nanoid';
import { ADD_CONTACT, DELETE_CONTACT, FILTER_CONTACT } from './types';

export const addNewContact = payload => {
  return { type: ADD_CONTACT, payload: { ...payload, id: nanoid() } };
};

export const deleteContact = payload => {
  return { type: DELETE_CONTACT, payload };
};

export const filterContact = payload => {
  return { type: FILTER_CONTACT, payload };
};
