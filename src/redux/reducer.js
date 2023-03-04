import { ADD_CONTACT, DELETE_CONTACT, FILTER_CONTACT } from './types';

const initialStore = {
  contacts: [],
  filter: '',
};

export const reducer = (store = initialStore, action) => {
  switch (action.type) {
    case ADD_CONTACT:
      const refreshedContacts = [...store.contacts, action.payload];
      return { ...store, contacts: refreshedContacts };

    case DELETE_CONTACT:
      return {
        ...store,
        contacts: store.contacts.filter(({ id }) => id !== action.payload),
      };

    case FILTER_CONTACT:
      return { ...store, filter: action.payload };

    default:
      return store;
  }
};
