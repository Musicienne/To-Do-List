import React, { useState } from 'react';
import '../App.css';
import Button from 'react-bootstrap/Button';

function ToDoList() {
  const [tasks, setTasks] = useState([
    { id: 1, name: "Eat breakfast", done: false },
    { id: 2, name: "Take a shower", done: false },
    { id: 3, name: "Walk the dog", done: false }
  ]);
  const [newTask, setNewTask] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTaskName, setEditTaskName] = useState("");

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function addTask() {
    if (newTask.trim() !== "") {
      const newTaskObject = {
        id: tasks.length + 1,
        name: newTask,
        done: false
      };
      setTasks([...tasks, newTaskObject]);
      setNewTask('');
    }
  }

  function deleteTask(id) {
    setTasks(tasks.filter(task => task.id !== id));
  }

  function changeStatus(id) {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, done: !task.done } : task
    );
    setTasks(updatedTasks);
  }

  function startEditing(id, currentName) {
    setEditingTaskId(id);
    setEditTaskName(currentName);
  }

  function saveEdit(id) {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, name: editTaskName } : task
    );
    setTasks(updatedTasks);
    setEditingTaskId(null);
  }

  function cancelEdit() {
    setEditingTaskId(null);
    setEditTaskName("");
  }

  return (
    <div className='to-do-list'>
      <h1>To-Do-List</h1>
      <div>
        <input
          className='input'
          type='text'
          placeholder='Enter a task...'
          value={newTask}
          onChange={handleInputChange}
        />
        <Button className="add-Button button" onClick={addTask}>Add</Button>
      </div>
      <ol>
        {tasks.map(task => (
<li key={task.id} className='list' style={{ background: task.done ? "#FFD0D0" : "#FF9EAA"}}>
            {editingTaskId === task.id ? (
              <>
                <input
                  type='text'
                  value={editTaskName}
                  onChange={(e) => setEditTaskName(e.target.value)}
                />
                <Button onClick={() => saveEdit(task.id)}>Save</Button>
                <Button onClick={() => cancelEdit()}>Cancel</Button>
              </>
            ) : (
              <>
                <span className='text' onClick={() => changeStatus(task.id)}
                                  style={{ textDecoration: task.done ? 'line-through' : 'none' }}
>{task.name}</span>
                <Button className='button' onClick={() => startEditing(task.id, task.name)}>Edit</Button>
                <Button className='button' onClick={() => deleteTask(task.id)}>Delete</Button>
              </>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default ToDoList;
