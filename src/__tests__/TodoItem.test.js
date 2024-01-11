import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoItem from '../components/TodoItem';

describe('Test Cases For <TodoItem />', () => {
    it("should render a div element with class 'todo-item-box' when todoItem prop is provided", () => {
        const todoItem = { task: 'Task 1', isComplete: false };
        const handleCheckBoxClick = jest.fn();
        const handleDelete = jest.fn();

        render(
            <TodoItem
                todoItem={todoItem}
                handleCheckBoxClick={handleCheckBoxClick}
                handleDelete={handleDelete}
            />
        );

        expect(screen.getByTestId('todo-item-box')).toBeInTheDocument();
    });

    it("should render an input element with class 'todo-item-checkbox' when todoItem prop is provided", () => {
        const todoItem = { task: 'Task 1', isComplete: false };
        const handleCheckBoxClick = jest.fn();
        const handleDelete = jest.fn();

        render(
            <TodoItem
                todoItem={todoItem}
                handleCheckBoxClick={handleCheckBoxClick}
                handleDelete={handleDelete}
            />
        );

        expect(screen.getByTestId('todo-item-checkbox')).toBeInTheDocument();
    });

    it("should render a div element with class 'todo-item-delete-link' containing the text 'Delete' when todoItem prop is provided", () => {
        const todoItem = { task: 'Task 1', isComplete: false };
        const handleCheckBoxClick = jest.fn();
        const handleDelete = jest.fn();

        render(
            <TodoItem
                todoItem={todoItem}
                handleCheckBoxClick={handleCheckBoxClick}
                handleDelete={handleDelete}
            />
        );

        expect(screen.getByText('Delete')).toBeInTheDocument();
        expect(screen.getByTestId('todo-item-delete-link')).toBeInTheDocument();
    });

    it('should call handleCheckBoxClick function when the checkbox is clicked', () => {
        const todoItem = { task: 'Task 1', isComplete: false };
        const handleCheckBoxClick = jest.fn();
        const handleDelete = jest.fn();

        render(
            <TodoItem
                todoItem={todoItem}
                handleCheckBoxClick={handleCheckBoxClick}
                handleDelete={handleDelete}
            />
        );

        const checkbox = screen.getByRole('checkbox');
        fireEvent.click(checkbox);

        expect(handleCheckBoxClick).toHaveBeenCalledTimes(1);
        expect(handleCheckBoxClick).toHaveBeenCalledWith(
            expect.any(Object),
            todoItem
        );
    });

    it('should call handleDelete function when the delete link is clicked', () => {
        const todoItem = { task: 'Task 1', isComplete: false };
        const handleCheckBoxClick = jest.fn();
        const handleDelete = jest.fn();

        render(
            <TodoItem
                todoItem={todoItem}
                handleCheckBoxClick={handleCheckBoxClick}
                handleDelete={handleDelete}
            />
        );

        const deleteLink = screen.getByText('Delete');
        fireEvent.click(deleteLink);

        expect(handleDelete).toHaveBeenCalledTimes(1);
        expect(handleDelete).toHaveBeenCalledWith(todoItem);
    });
});
