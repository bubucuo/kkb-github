import React, { Component } from 'react';
import styles from './_layout.css';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return (
      <div className={styles.normal}>
        <h1>Page _layout</h1>
        {this.props.children}
      </div>
    );
  }
}
