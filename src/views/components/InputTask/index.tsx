import React, {useState, useRef, useEffect} from 'react';

import styles from './index.module.scss';


interface InputTaskProps {
    id: string;
    title: string;
    onDone: (id: string) => void;
    onEdit: (id: string, title: string) => void;
    onRemoved: (id: string) => void;
}

export const InputTask: React.FC<InputTaskProps> = ({
    id,
    title,
    onDone,
    onEdit,
    onRemoved
}) => {

const [checked, setChecked] = React.useState(false);
const [isEditMode, setIsEditMode] = React.useState(false);
const [value, setValue] = React.useState(title);
const editTitleInputRef = React.useRef<HTMLInputElement>(null);

useEffect(() => {
    if(isEditMode) {
        editTitleInputRef?.current?.focus()
    };
}, [isEditMode])

    return (
        <div className={styles.InputTask}>
            <label className={styles.InputTaskLabel}>
                <input
                    disabled={isEditMode}
                    type="checkbox"
                    checked={checked}
                    className={styles.InputTaskCheckbox}
                    onChange={(event) => {
                        setChecked(event.target.checked)
                        if(event.target.checked) {
                           setTimeout(() => {
                            onDone(id)
                           }, 300)
                        }
                    }}
                />
                {isEditMode
                ? (<input
                    ref={editTitleInputRef}
                    value={value}
                    onChange={(event) => {
                        setValue(event.target.value);
                    }}
                    onKeyDown={(event) => {
                        if(event.key === 'Enter'){
                    setIsEditMode(false);
                    onEdit(id, value); }
                    }}
                    className={styles.InputTaskTitleEdit}
                />) :
                (<h3 className={styles.InputTaskText}>{title}</h3>)
            }
            </label>
{  isEditMode ? (
            <button
                arial-label="Save"
                className={styles.InputTaskSave}
                onClick={() => {
                    onEdit(id, value);
                    setIsEditMode(false);
                }}
            >
            </button> )
 :      (  <button
                arial-label="Edit"
                className={styles.InputTaskEdit}
                onClick={() => {
                    setIsEditMode(true);
                }}
            >
            </button>)}
            <button
                arial-label="Remove"
                className={styles.InputTaskRemove}
                onClick={() => {
                    if(confirm('Are you sure?')) {
                        onRemoved(id)
                    }
                }}
            >
            </button>
        </div>
    )
}