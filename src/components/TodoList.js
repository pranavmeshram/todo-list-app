import React, { useState } from 'react';
import TodoItem from './TodoItem';
import { v4 as uuidv4 } from 'uuid';

const TodoList = () => {
    const [taskInput, setTaskInput] = useState('');
    const [todoList, setTodoList] = useState([]);

    const handleSubmit = () => {
        const trimmedTaskInput = taskInput.trim();
        if (!trimmedTaskInput) {
            return;
        }
        const newTodoPayload = {
            taskId: uuidv4(),
            task: trimmedTaskInput,
            isComplete: false,
        };
        setTodoList((prevTodoList) => [...prevTodoList, newTodoPayload]);
        setTaskInput('');
    };

    const handleCheckBoxClick = (e, todoItem) => {
        const todoData = todoList.map((item) => {
            if (item.taskId === todoItem.taskId) {
                return {
                    ...item,
                    isComplete: e.target.checked,
                };
            }
            return item;
        });
        setTodoList(todoData);
    };

    const handleDelete = (todoItem) => {
        const newData = todoList.filter(
            (item) => item.taskId !== todoItem.taskId
        );
        setTodoList(newData);
    };

    return (
        <div className='container-fluid App'>
            <div className='d-flex justify-content-center align-items-center my-4'>
                <input
                    className='w-25 p-2'
                    type='text'
                    placeholder='Add new task here'
                    value={taskInput}
                    onChange={(e) => setTaskInput(e.target.value)}
                />
                <button
                    className='ms-3 py-2 px-4 btn btn-outline-success fw-bold'
                    onClick={handleSubmit}>
                    Add Task
                </button>
            </div>

            <div className='container text-center mt-5'>
                {todoList.length > 0 ? (
                    todoList.map((todoItem) => (
                        <TodoItem
                            key={todoItem.taskId}
                            todoItem={todoItem}
                            handleCheckBoxClick={handleCheckBoxClick}
                            handleDelete={handleDelete}
                        />
                    ))
                ) : (
                    <div className='lead text-muted'>
                        <p className='m-0'>No tasks added yet.</p>
                        <p className='m-0'>Please add new task.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TodoList;
