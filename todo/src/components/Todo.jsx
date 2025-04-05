import { useSelector } from "react-redux";
import AddForm from "./AddForm";
import { useDispatch } from 'react-redux';
import { deleteTodo } from "../features/todo/todoSlice";

export default function Todo() {
    const todos = useSelector((state) => state.todoReducer.todos);
    console.log(todos);
    const dispatch = useDispatch();
    const clickhandler = (id) => {
        console.log("clicked",id);
        dispatch(deleteTodo(id));
    }
    return (
        <>
        <AddForm />
            <h1>Todo App</h1>
            <ul>
                {todos.map((todo)=>{
                    return <li key={todo.id}>{todo.task}
                     <button onClick={()=> clickhandler(todo.id)}>Delete</button>
                    </li>
                // The id of the clicked todo will be logged in the clickhandler function
                })}
            </ul>
        </>
    )
}