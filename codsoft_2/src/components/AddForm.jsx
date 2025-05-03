import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTodo } from '../features/todo/todoSlice'
import styles from './AddForm.module.css'

export default function AddForm() {
    const [task, setTask] = useState('')
    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        if (task.trim()) {
            dispatch(addTodo(task))
            setTask('')
        }
    }

    return (
        <form className={styles.form} onSubmit={submitHandler}>
            <input
                type="text"
                className={styles.input}
                value={task}
                onChange={(e) => setTask(e.target.value)}
            />
            <button type="submit" className={styles.addBtn}>
                Add Task
            </button>
        </form>
    )
}
