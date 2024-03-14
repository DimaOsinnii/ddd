import type { Component } from 'solid-js';

import styles from './App.module.css';
import { User } from './modules/user';

const App: Component = () => {
    return (
        <div class={styles.App}>
            <User />
        </div>
    );
};

export default App;
