import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactsList/ContactsList';
import { Filter } from 'components/Filter/Filter';
import { useSelector, useDispatch } from 'react-redux';
import { addNewContact, deleteContact, filterContact } from 'redux/action';
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

    dispatch(addNewContact(data));
  };

  const changeFilter = e => {
    dispatch(filterContact(e.target.value));
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  };

  const removeContact = contactId => {
    dispatch(deleteContact(contactId));
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
