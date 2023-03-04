import { useState, useEffect, useRef } from 'react';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactsList/ContactsList';
import { Filter } from 'components/Filter/Filter';
import { nanoid } from 'nanoid';
import getDataFromLocalStorage from 'shared/utils/localStorage';
import styles from './Phonebook.module.scss';

const INITIAL_STATE = {
  contacts: [],
  filter: '',
};

export const Phonebook = () => {
  const [contacts, setContacts] = useState(() =>
    getDataFromLocalStorage('contacts', INITIAL_STATE.contacts)
  );

  const [filter, setFilter] = useState(INITIAL_STATE.filter);

  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addNewContact = data => {
    const { name, number } = data;
    const normalizedNames = contacts.map(contact => contact.name.toLowerCase());
    const allTelephones = contacts.map(contact => contact.number);

    if (normalizedNames.includes(name.toLowerCase())) {
      alert(`${name} already in contacts`);
      return;
    } else if (allTelephones.includes(number)) {
      alert(`${number} already in contacts`);
      return;
    }
    const newContact = { ...data, id: nanoid(8) };
    setContacts(prevState => {
      return [...prevState, newContact];
    });
  };

  const changeFilter = e => {
    setFilter(e.target.value);
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  };

  const deleteContact = contactId => {
    setContacts(contacts => contacts.filter(({ id }) => id !== contactId));
  };

  const filtered = getFilteredContacts();

  return (
    <section>
      <h1 className={styles.title}>Phonebook</h1>
      <ContactForm addNewContact={addNewContact} />
      <h2 className={styles.contactsTitle}>Contacts</h2>
      <Filter onChangeFilter={changeFilter} value={filter} />
      <ContactList contacts={filtered} deleteContact={deleteContact} />
    </section>
  );
};
