import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactsList/ContactsList';
import { Filter } from 'components/Filter/Filter';
import styles from './Phonebook.module.scss';

export const Phonebook = () => {
  return (
    <section>
      <h1 className={styles.title}>Phonebook</h1>
      <ContactForm />
      <h2 className={styles.contactsTitle}>Contacts</h2>
      <Filter />
      <ContactList />
    </section>
  );
};
