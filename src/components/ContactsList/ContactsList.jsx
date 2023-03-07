import { ContactListItem } from 'components/ContactsListItem/ContactsListItem';
import { useSelector, useDispatch } from 'react-redux';
import { contactDelete } from 'redux/contacts/contactsSlice';
import { getContacts, getFilter } from 'redux/selectors';
import styles from './ContactsList.module.scss';

export const ContactList = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  };

  const dispatch = useDispatch();

  const deleteContact = contactId => {
    dispatch(contactDelete(contactId));
  };

  const filtered = getFilteredContacts();

  return (
    <ul className={styles.list}>
      {filtered.map(contact => {
        const { id, name, number } = contact;
        return (
          <ContactListItem
            key={id}
            id={id}
            name={name}
            number={number}
            deleteContact={() => deleteContact(id)}
          />
        );
      })}
    </ul>
  );
};
