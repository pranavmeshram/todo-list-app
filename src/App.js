import React from 'react';
import TodoList from './components/TodoList';

function App() {
    return (
        <React.Fragment>
            <h2 className='display-4 text-center my-4'>Todo App</h2>
            <TodoList />
        </React.Fragment>
    );
}

export default App;
