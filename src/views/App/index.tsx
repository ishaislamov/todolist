import React, {useEffect, useRef} from 'react';
import {InputPlus} from '../components/InputPlus'

import {useToDoStore} from '../../data/stores/useToDoStore'
import {InputTask} from '../components/InputTask';


import styles from './index.module.scss'
export const App: React.FC = () => {
    const [
        tasks,
        createTask,
        updateTask,
        removeTask
    ] = useToDoStore(state => [
        state.tasks,
        state.createTask,
        state.updateTask,
        state.removeTask,
    ])
    
const isMounted = React.useRef(false);
// save in localStorage
React.useEffect(() => {
    if(isMounted.current)
    {const json = JSON.stringify(tasks);
    localStorage.setItem('tasks', json);}
    isMounted.current = true;
    }, [tasks])

    return (
        <article className={styles.article}>
            <h1 className={styles.articleTitle}>To Do List</h1>
            <section className={styles.articleSection}>
                <InputPlus onAdd={(title) => {
                        if(title) {
                            createTask(title)
                        }
                    }
                } />
            </section>
            <section className={styles.articleSection}>
                {!tasks.length && 
                   (<h3 className={styles.articleText}> There is no task yet</h3>)
                }
                {tasks.map((task) => 
                <InputTask  key={task.id}
                            id={task.id}
                            title={task.title}
                            onDone={removeTask}
                            onEdit={updateTask}
                            onRemoved={removeTask}
                />)}
            </section>
        </article>
    )
}