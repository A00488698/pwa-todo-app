import React, { useState, useEffect } from 'react';

const TodoList = () => {
    const [task, setTask] = useState("");
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        setTasks(savedTasks);
    }, []);

    const addTask = () => {
        if (!task) return;
        const newTasks = [...tasks, { id: Date.now(), text: task }];
        setTasks(newTasks);
        localStorage.setItem("tasks", JSON.stringify(newTasks));
        setTask("");
    };

    const removeTask = (id) => {
        const updatedTasks = tasks.filter((t) => t.id !== id);
        setTasks(updatedTasks);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    };

    return (
        <div>
            <h1>To-Do PWA</h1>
            <input value={task} onChange={(e) => setTask(e.target.value)} />
            <button onClick={addTask}>Add</button>
            <ul>
                {tasks.map((t) => (
                    <li key={t.id}>
                        {t.text} <button onClick={() => removeTask(t.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;