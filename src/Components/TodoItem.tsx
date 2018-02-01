import * as React from 'react';
import { TodoProps } from '../Interfaces/TodoInterface';

function TodoItem(props: {todo: TodoProps, index: number, deleteTodo: any, editTodo: any}) {
	return (
		<div>
			<li className="todo-item">
				<strong> {props.todo.id} </strong> : {props.todo.name}
				{/* <span className="tagName"></span> */}
				<button className="delete-button" onClick={() => props.deleteTodo(props.todo)}>delete</button>
				<button className="edit-button" onClick={() => props.editTodo(props.todo)}>edit</button>
			</li>
		</div>
	);
}

export default TodoItem;