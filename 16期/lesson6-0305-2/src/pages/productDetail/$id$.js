/* eslint-disable react/react-in-jsx-scope */
import styles from './$id$.css';

export default function({ match }) {
  const { id } = match.params;
  return (
    <div className={styles.normal}>
      <h1>Page $id$</h1>
      <p>{id || 'id不存在'}</p>
    </div>
  );
}
