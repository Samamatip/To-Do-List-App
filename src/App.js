import React, {useState, useEffect} from "react";
import './App.css';

function App(){

    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    useEffect(()=>{ 
        setTasks(['To learn programming.', 'To go to work'])
    }, []);

    const addTask = () => {

        if(newTask){
            setTasks([...tasks, newTask]);
            setNewTask('');
        }

    }

    const deleteTask = (index) => {
        const copyTask = tasks.slice();
        copyTask.splice(index, 1);
        setTasks(copyTask);


    }
    return (
        <div className="container"> 
            <div className="innerContainer">
            <h1>
                Sammy To-Do List App
            </h1>
            <input 
            type="text"
            value={newTask}
            placeholder='Enter New Task Here' 
            onChange={(e)=> setNewTask(e.target.value)}/>
            <button onClick={addTask}>Add New Task</button>

            <ul>
                {tasks.map((task, index) => (
            
            <li key={index}>
                {task} 
                <button className ='deletebutton' onClick={() => deleteTask(index)}>Delete</button>
                
            </li>
            
            ))}
                
            </ul>
            </div>

        </div>
    );
}

export default App;