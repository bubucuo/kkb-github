import styles from './$id.less';

export default function({ match }) {
  return (
    <div className={styles.normal}>
      <h1>Page $id</h1>
      <p>{match.params.id}</p>
    </div>
  );
}
