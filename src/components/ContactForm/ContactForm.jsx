import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './ContactsForm.module.scss';

const INITIAL_STATE = {
  name: '',
  number: '',
};

export const ContactForm = ({ addNewContact }) => {
  const [state, setState] = useState({ ...INITIAL_STATE });

  const handleChange = evt => {
    const { name, value } = evt.target;

    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    addNewContact({ ...state });
    reset();
  };

  const reset = () => {
    setState({ ...INITIAL_STATE });
  };

  const { name, number } = state;
  return (
    <form className={styles.form} onSubmit={handleFormSubmit}>
      <label className={styles.label} htmlFor="tel">
        Name
      </label>
      <input
        className={styles.input}
        onChange={handleChange}
        id="name"
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        value={name}
        placeholder="Enter name..."
      />
      <label className={styles.label} htmlFor="tel">
        Number
      </label>
      <input
        className={styles.input}
        onChange={handleChange}
        id="tel"
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        value={number}
        placeholder="Enter phone..."
      />
      <button className={styles.btn} type="submit">
        Add contact
      </button>
    </form>
  );
};

ContactForm.propTypes = {
  addNewContact: PropTypes.func.isRequired,
};
