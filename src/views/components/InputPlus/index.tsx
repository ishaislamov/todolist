import React, {useState, useCallback} from 'react';

import styles from './index.module.scss'

interface InputPlusProps {
    onAdd: (title:string) => void;
}
export const InputPlus: React.FC<InputPlusProps> = ({
    onAdd,
}) => {

const [inputValue, setInputValue] = React.useState('');
const addTask = useCallback(() => {
    onAdd(inputValue);
    setInputValue('');
}, [inputValue]);

    return (
        <div className={styles.InputPlus}>
            <input 
                type="text"
                placeholder="Type task..."
                className={styles.InputPlusValue}
                value={inputValue}
                onChange={(event) => {
                    setInputValue(event.target.value);
                }}
                onKeyDown={(event) => {
                    if(event.key === 'Enter'){
                        addTask();
                    }
                }}
            />
            <button
                onClick={addTask}
                aria-label='Add'
                className={styles.InputPlusAdd}
            />
        </div>
    )
}