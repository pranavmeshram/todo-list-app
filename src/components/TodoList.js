import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import { v4 as uuidv4 } from 'uuid';
import { TODO_APIS } from '../networking/Apis';
import '../styles/todoItem.css';

const TodoList = () => {
    const [taskInput, setTaskInput] = useState('');
    const [todoList, setTodoList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        getTodos();
    }, []);

    const getTodos = async () => {
        try {
            setIsError(false);
            const resp = await fetch(TODO_APIS.FETCH_TODOS);
            const response = await resp?.json();
            response && response.length > 0 && setTodoList(response);
        } catch (error) {
            setIsError(true);
            console.log(
                '[devLogs] - Something went wrong while fetching the todo items',
                error
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async () => {
        try {
            setIsLoading(true);
            setIsError(false);
            const trimmedTaskInput = taskInput.trim();
            if (!trimmedTaskInput) {
                return;
            }
            const newTodoPayload = {
                taskId: uuidv4(),
                task: trimmedTaskInput,
                isComplete: false,
            };
            await fetch(TODO_APIS.CREATE_TODO, {
                method: 'POST',
                body: JSON.stringify(newTodoPayload),
            });
            await getTodos();
            setTaskInput('');
        } catch (error) {
            setIsError(true);
            console.log(
                `[devLogs] - Something went wrong while adding ${taskInput} todo task`,
                error
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleCheckBoxClick = async (e, todoItem) => {
        try {
            setIsLoading(true);
            setIsError(false);
            const updateUrl = TODO_APIS.UPDATE_TODO.replace(
                '{{taskId}}',
                todoItem.id
            );
            let payload;
            const todoData = todoList.map((item) => {
                if (item.taskId === todoItem.taskId) {
                    payload = {
                        ...item,
                        isComplete: e.target.checked,
                    };
                    return payload;
                }
                return item;
            });
            await fetch(updateUrl, {
                method: 'PUT',
                body: JSON.stringify(payload),
            });
            setTodoList(todoData);
        } catch (error) {
            setIsError(true);
            console.log(
                `[devLogs] - Something went wrong while marking complete to ${todoItem.task}`,
                error
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (todoItem) => {
        try {
            setIsLoading(true);
            setIsError(false);
            const deleteUrl = TODO_APIS.DELETE_TODO.replace(
                '{{taskId}}',
                todoItem.id
            );
            await fetch(deleteUrl, {
                method: 'DELETE',
            });
            await getTodos();
            const newData = todoList.filter(
                (item) => item.taskId !== todoItem.taskId
            );
            setTodoList(newData);
        } catch (error) {
            setIsError(true);
            console.log(
                `[devLogs] - Something went wrong while deleting ${todoItem.task} todo task`,
                error
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleReload = () => {
        window.location.reload(false);
    };
    const handleGitHubRedirection = () => {
        window.open('https://github.com/pranavmeshram', '_blank');
    };

    return (
        <>
            {isError ? (
                <div className='jumbotron shadow-lg p-5 mx-5 mt-5 text-center'>
                    <h1 className='display-4'>OOPS...!</h1>
                    <h2 className='h4 mb-4'>
                        Something went wrong with your app
                    </h2>
                    <hr className='my-4 mx-4' />
                    <p className='mb-4'>
                        Please try again by reloading the app
                    </p>
                    <button
                        type='button'
                        className='btn btn-outline-danger px-5'
                        data-toggle='tooltip'
                        data-placement='top'
                        title='Reload the app'
                        onClick={handleReload}>
                        Reload
                    </button>
                    <p className='lead my-4'>
                        Try contacting&nbsp;
                        <span
                            className='developer-link'
                            onClick={handleGitHubRedirection}>
                            the developer
                        </span>
                        &nbsp;if the issue persists
                    </p>
                </div>
            ) : (
                <div className='container-fluid'>
                    <h2 className='display-4 text-center my-4'>Todo App</h2>
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

                    {isLoading ? (
                        <div className='mt-5  d-flex justify-content-center'>
                            <div className='spinner-border' role='status' />
                        </div>
                    ) : (
                        <div className='container text-center mt-5'>
                            {todoList.length > 0 ? (
                                todoList.map((todoItem) => (
                                    <TodoItem
                                        key={todoItem.taskId}
                                        todoItem={todoItem}
                                        handleCheckBoxClick={
                                            handleCheckBoxClick
                                        }
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
                    )}
                </div>
            )}
        </>
    );
};

export default TodoList;
