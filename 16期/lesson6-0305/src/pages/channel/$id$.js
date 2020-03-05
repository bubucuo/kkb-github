import styles from './$id$.css';

export default function({ location, match }) {
  const { id } = match.params;
  return (
    <div className={styles.normal}>
      <h1>Page $id$</h1>
      <p>{id || '没有id'}</p>
    </div>
  );
}
