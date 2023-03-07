import styles from './Delete.module.scss';

export const Delete = ({ deleteContact }) => {
  return (
    <button className={styles.btn} type="button" onClick={deleteContact}>
      Delete
    </button>
  );
};
