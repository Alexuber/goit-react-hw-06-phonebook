import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactsList/ContactsList';
import { Filter } from 'components/Filter/Filter';
import { useSelector, useDispatch } from 'react-redux';
import { contactFilter } from 'redux/filterSlice';
import { contactAdd, contactDelete } from 'redux/contactsSlice';
import { nanoid } from 'nanoid';
import styles from './Phonebook.module.scss';

export const Phonebook = () => {
  const contacts = useSelector(state => {
    return state.contacts;
  });

  const filter = useSelector(state => state.filter);

  const dispatch = useDispatch();

  const addContact = data => {
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

    dispatch(contactAdd(data));
  };

  const changeFilter = e => {
    dispatch(contactFilter(e.target.value));
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  };

  const removeContact = contactId => {
    dispatch(contactDelete(contactId));
  };

  const filtered = getFilteredContacts();

  return (
    <section>
      <h1 className={styles.title}>Phonebook</h1>
      <ContactForm addNewContact={addContact} />
      <h2 className={styles.contactsTitle}>Contacts</h2>
      <Filter onChangeFilter={changeFilter} value={filter} />
      <ContactList contacts={filtered} deleteContact={removeContact} />
    </section>
  );
};
