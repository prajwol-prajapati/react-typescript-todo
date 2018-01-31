import * as React from 'react';
import TodoItem from './TodoItem';
import { TodosProps, TodoProps } from '../Interfaces/TodoInterface';

function Todos(props: TodosProps) {
	console.log(props);
	let todoItems;
	if (props.todos) {
		todoItems = props.todos.map((todo: TodoProps, i: number) => {
			return (
				<TodoItem
					key={todo.id}
					todo={todo}
					index={i}
					editTodo={props.editTodo}
					deleteTodo={props.deleteTodo}
				/>
			);
		});
	}

	return (
		<div className="todos">
			<h1> Todos </h1>
			<ul>
				{todoItems}
			</ul>
		</div>
	);
}

export default Todos;
