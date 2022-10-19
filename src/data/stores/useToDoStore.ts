import create from 'zustand';
import React, {useEffect} from 'react';

import { generateId } from '../helpers';
import {devtools} from 'zustand/middleware';

interface Task {
    id: string;
    title: string;
    createdTime: number;
}

interface ToDoStore {
    tasks: Task [];
    createTask: (title: string) => void;
    updateTask: (id: string, title: string) => void;
    removeTask: (id: string) => void;
}
// getItems from localStorage
const getCurrentState = () => {
    const currentState = (JSON.parse(window.localStorage.getItem
        ('tasks') || '[]')) as Task[];
        return currentState
}
export const useToDoStore = create<ToDoStore>((set, get) => ({
    tasks: getCurrentState(),

    createTask: (title) => {
        const {tasks} = get();
        const newTask = {
            id: generateId(),
            title,
            createdTime: Date.now()
        }
    set({
        tasks: [newTask].concat(tasks),
    })
    },
    updateTask: (id:string, title:string) => {
        const {tasks} = get();
        set({
            tasks: tasks.map((task) => ({
                ...task,
                title: task.id === id ? title : task.title
            }))
        })
    },
    removeTask: (id:string) => {
        const {tasks} = get();
        set({
            tasks: tasks.filter((task) => task.id !== id)
        })
    },
}))