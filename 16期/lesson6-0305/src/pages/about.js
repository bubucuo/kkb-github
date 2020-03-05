import router from 'umi/router';
import { Button } from 'antd';
import styles from './about.css';

export default function({ location }) {
  return (
    <div className={styles.normal}>
      <h1>Page about</h1>
      <Button onClick={() => router.push('/more/index')}>go more</Button>
    </div>
  );
}
