import React from 'react';

const TodoItem = ({ todoItem, handleCheckBoxClick, handleDelete }) => {
    return (
        <div
            className='d-flex my-3 py-4 shadow w-50 todo-item-box'
            data-testid='todo-item-box'>
            <input
                className='form-check-input todo-item-checkbox'
                data-testid='todo-item-checkbox'
                type='checkbox'
                checked={todoItem.isComplete}
                onChange={(e) => handleCheckBoxClick(e, todoItem)}
            />
            <div
                className={`text-center ${
                    todoItem.isComplete ? 'todo-item-completed' : ''
                }`}>
                {todoItem.task}
            </div>
            <div
                className='todo-item-delete-link text-primary'
                data-testid='todo-item-delete-link'
                onClick={() => handleDelete(todoItem)}>
                Delete
            </div>
        </div>
    );
};

export default TodoItem;
