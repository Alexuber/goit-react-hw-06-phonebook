import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactsList/ContactsList';
import { Filter } from 'components/Filter/Filter';
import { useSelector, useDispatch } from 'react-redux';
import { contactFilter } from 'components/Phonebook/filterSlice';
import { contactAdd, contactDelete } from 'components/Phonebook/contactsSlice';
import { getContacts, getFilter } from 'components/Phonebook/contactsSlice';
import styles from './Phonebook.module.scss';

export const Phonebook = () => {
  const contacts = useSelector(getContacts());

  const filter = useSelector(getFilter());

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
