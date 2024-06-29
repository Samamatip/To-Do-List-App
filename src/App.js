import { useState } from 'react';
import './App.css';
import { getTodo, updateTodo, deleteTodo, createTodo } from './services';
import { useFetch } from './utilities';

function App() {
    const [loading, setLoading] = useState(false);
    const [tasks, setTasks] = useState([ ]);
    const [expandedTaskId, setExpandedTaskId] = useState(null);
    const [todo, setTodo] = useState({
        title: "",
        description: "",
        dueTime: "",
        completed: false,
    });

    useFetch(getTodo, setTasks, setLoading);

    const deleteTask = async (taskId) => {
        try {
            await deleteTodo(taskId);
            setTasks(tasks.filter(task => task._id !== taskId));
        } catch (err) {
            console.error('Error in deleting task', err);
        }
    };

    const saveTasks = async (event) => {
        event.preventDefault();
        if (!todo.title || !todo.description || !todo.dueTime) {
            alert('Please fill in all fields');
            return;
        }
        try {
            const newTask = await createTodo(todo);
            setTasks([...tasks, newTask]);
            setTodo({
                title: "",
                description: "",
                dueTime: "",
                completed: false,
            });
        } catch (err) {
            console.error('Error in creating task', err);
        }
    };

    const updateTask = async (taskId, updatedTodo) => {
        try {
            const updatedTask = await updateTodo(taskId, updatedTodo);
            setTasks(tasks.map(task => (task._id === taskId ? updatedTask : task)));
        } catch (err) {
            console.error('Error in updating task', err);
        }
    };

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setTodo(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const toggleTaskDetails = (taskId) => {
        setExpandedTaskId(prevId => (prevId === taskId ? null : taskId));
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="container">
            <div className="innerContainer">
                <h1>Sammy To-Do List App</h1>
                <form onSubmit={saveTasks}>
                    <input
                        className='title'
                        name="title"
                        type="text"
                        value={todo.title}
                        placeholder='Enter Task title'
                        onChange={handleChange}
                        required
                    />
                    <br />
                    <textarea
                        className='task-description'
                        name="description"
                        value={todo.description}
                        placeholder='Enter Task description'
                        onChange={handleChange}
                        required
                    />
                    <br />
                    <label htmlFor='dueTime'>Due Time:</label>
                    <input
                        id='dueTime'
                        name="dueTime"
                        type="datetime-local"
                        value={todo.dueTime}
                        onChange={handleChange}
                        required
                    /><br />
                    <button type='submit'>Add New Task</button>
                </form>
                <ul>
                    {tasks.map((task) => (
                        <li key={task._id}>
                            <div 
                                className='head'
                                onClick={() => toggleTaskDetails(task._id)}
                            >
                                <span>{task.title}</span>
                                <span>{new Date(task.dueTime).toLocaleString()}</span>
                            </div>
                            {expandedTaskId === task._id && (
                                <div className='expanded'>
                                    <p className='description'>{task.description}</p>
                                    <p>Completed: {task.completed ? 'Yes' : 'No'}</p>
                                    <button className='deletebutton' onClick={() => deleteTask(task._id)}>Delete</button>
                                    <button className='updatebutton' onClick={() => updateTask(task._id, { ...task, completed: !task.completed })}>
                                        {task.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
                                    </button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default App;
