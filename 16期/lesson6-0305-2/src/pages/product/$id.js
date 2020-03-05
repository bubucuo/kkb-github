import styles from './$id.css';

export default function(props) {
  // 这里的props上也有context，框架帮我们传值了
  console.log('props', props); // sy-log
  const { id } = props.match.params;
  return (
    <div className={styles.normal}>
      <h1>Page $id</h1>
      <p>{id}</p>
    </div>
  );
}
