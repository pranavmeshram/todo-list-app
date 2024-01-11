import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from '../components/TodoList';

describe('Test Cases For <TodoList />', () => {
    it('should render the input field and add task button', () => {
        render(<TodoList />);

        const inputField = screen.getByPlaceholderText('Add new task here');
        const addButton = screen.getByRole('button', { name: 'Add Task' });

        expect(inputField).toBeInTheDocument();
        expect(addButton).toBeInTheDocument();
    });

    it('should handle case when there are no tasks in the list', () => {
        render(<TodoList />);

        const noTasksMessage = screen.getByText('No tasks added yet.');
        const pleaseAddTaskMessage = screen.getByText('Please add new task.');

        expect(noTasksMessage).toBeInTheDocument();
        expect(pleaseAddTaskMessage).toBeInTheDocument();
    });

    it('should not add a task if the input field is empty', () => {
        render(<TodoList />);
        const addButton = screen.getByRole('button', { name: 'Add Task' });

        fireEvent.click(addButton);

        const noTasksMessage = screen.getByText('No tasks added yet.');
        expect(noTasksMessage).toBeInTheDocument();
    });

    it('should allow user to input a task and add it to the list', () => {
        render(<TodoList />);
        const inputField = screen.getByPlaceholderText('Add new task here');
        const addButton = screen.getByRole('button', { name: 'Add Task' });

        fireEvent.change(inputField, { target: { value: 'Task 1' } });
        fireEvent.click(addButton);

        expect(screen.getByText('Task 1')).toBeInTheDocument();
    });

    it('should mark a task as complete when its checkbox is clicked', () => {
        render(<TodoList />);
        const inputField = screen.getByPlaceholderText('Add new task here');
        const addButton = screen.getByRole('button', { name: 'Add Task' });

        fireEvent.change(inputField, { target: { value: 'Task 1' } });
        fireEvent.click(addButton);

        const todoItem = screen.getByTestId('todo-item-box');
        const checkbox = within(todoItem).getByTestId('todo-item-checkbox');

        fireEvent.click(checkbox);

        expect(checkbox.checked).toBe(true);
    });

    it('should delete a task when its delete link is clicked', () => {
        render(<TodoList />);
        const inputField = screen.getByPlaceholderText('Add new task here');
        const addButton = screen.getByRole('button', { name: 'Add Task' });

        fireEvent.change(inputField, { target: { value: 'Task 1' } });
        fireEvent.click(addButton);

        const todoItem = screen.getByTestId('todo-item-box');
        const deleteLink = within(todoItem).getByTestId(
            'todo-item-delete-link'
        );

        fireEvent.click(deleteLink);

        expect(todoItem).not.toBeInTheDocument();
    });
});
