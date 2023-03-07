import { useSelector, useDispatch } from 'react-redux';
import { getFilter } from 'redux/selectors';
import { contactFilter } from 'redux/filter/filterSlice';
import styles from './Filter.module.scss';

export const Filter = () => {
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const changeFilter = e => {
    dispatch(contactFilter(e.target.value));
  };
  return (
    <>
      <h3 className={styles.title}>Find contacts by name</h3>
      <input
        className={styles.input}
        type="text"
        name="filter"
        onChange={changeFilter}
        value={filter}
        placeholder="Search..."
      />
    </>
  );
};
