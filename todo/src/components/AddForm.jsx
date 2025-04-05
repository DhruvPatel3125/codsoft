import React,{useState} from 'react'
import { useDispatch } from 'react-redux';
import { addTodo } from '../features/todo/todoSlice';

export default function AddForm() {
    const [task, setTask] = useState('');
    const dispatch = useDispatch();


    const submitHandler = (e) => {
        e.preventDefault();
        if(task){
            console.log(task);
            dispatch(addTodo(task));
            setTask('');
        }else{
            alert("Please enter a task")
        }
    }
  return (
    <>
    <form onSubmit={submitHandler}>
    <input type="text" onChange={(e) => setTask(e.target.value)} />
    <button type="submit">Add Task</button>
    </form>
    
    </>
  )
}
