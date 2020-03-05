import { Button } from 'antd';
import router from 'umi/router';
import styles from './about.css';

export default function() {
  return (
    <div className={styles.normal}>
      <h1>Page about</h1>
      <p>omg</p>
      <Button
        type="primary"
        onClick={() => {
          router.push('/more/index');
        }}
      >
        go more
      </Button>
    </div>
  );
}
