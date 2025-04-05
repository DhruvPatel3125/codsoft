import { useSelector, useDispatch } from "react-redux"
import AddForm from "./AddForm"
import { deleteTodo, toggleComplete } from "../features/todo/todoSlice"
import styles from './Todo.module.css'

export default function Todo() {
    const todos = useSelector((state) => state.todoReducer.todos)
    const dispatch = useDispatch()

    const handleDelete = (id) => {
        dispatch(deleteTodo(id))
    }

    const handleToggle = (id) => {
        dispatch(toggleComplete(id))
    }

    return (
        <div className={styles.todoContainer}>
            <h1 className={styles.header}>Todo App</h1>
            <AddForm />
            <ul className={styles.todoList}>
                {todos.map((todo) => (
                    <li key={todo.id} className={styles.todoItem}>
                        <div className={styles.todoLeft}>
                            <input
                                type="checkbox"
                                checked={todo.isDone}
                                onChange={() => handleToggle(todo.id)}
                                className={styles.checkbox}
                            />
                            <span className={`${styles.todoText} ${todo.isDone ? styles.completed : ''}`}>
                                {todo.task}
                            </span>
                        </div>
                        <button 
                            className={styles.deleteBtn}
                            onClick={() => handleDelete(todo.id)}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}