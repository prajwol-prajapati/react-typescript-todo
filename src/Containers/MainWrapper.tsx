import * as React from 'react';
import axiosService from '../Services/axiosService';
import { connect } from 'react-redux';
import * as action from '../Actions/todoAction';
import Todos from '../Components/Todos';
import TodoForm from '../Components/TodoForm';
import Search from '../Components/Search';
import { TodoProps, StoreProps, DefaultValueType } from '../Interfaces/TodoInterface';
import './main.css';
// import EditTodo from '../Components/EditTodo';

class MainWrapper extends React.Component<any, any> {

	defaultValue: DefaultValueType = {
		completed: ['false', 'true'],
		tags: ['home', 'work', 'entertainment'],
		edit: {
			name: '',
			tags: [],
			completed: 'false',
		},
		// date: moment()

	};

	constructor(props: StoreProps) {
		super(props);
		this.getTodos = this.getTodos.bind(this);
		this.toggleAddEditForm = this.toggleAddEditForm.bind(this);
		this.showEdit = this.showEdit.bind(this);
		this.deleteTodo = this.deleteTodo.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.addTodo = this.addTodo.bind(this);
		this.submitEdit = this.submitEdit.bind(this);
	}

	getTodos(): void {
		axiosService.get('todos')
			.then(
			(value: any) => {
				// console.log(value.data.result.data, 'value.data.data');
				this.props.dispatch(action.getTodos(value.data.result.data));
			}
			);
	}

	componentDidMount(): void {
		this.getTodos();
	}

	handleChange(event: any) {
		let eventName = event.target.name;
		let value = event.target.value;

		this.props.dispatch(action.handleChange(eventName, value));
		// console.log('handling Change');
	}

	toggleAddEditForm() {
		this.props.dispatch(action.toggleAddEditForm());
	}

	addTodo(e: any) {
		e.preventDefault();
		let todo = this.props.newTodo;
		axiosService.post('todos', {
			name: todo.name,
			tags: todo.tags,
			done: todo.completed,
			date: todo.date
		})
			.then((result) => {
				console.log('resultrasdfas', result.data.id);
				this.toggleAddEditForm();
				this.props.dispatch(action.addTodo(result.data.id));
				this.props.dispatch(action.initializeInput());
			});
	}

	showEdit(todo: TodoProps): void {
		console.log('inside edit');
		console.log(todo);
		this.toggleAddEditForm();
		this.props.dispatch(action.initializeEdit(todo));
		// axiosService.put('todos/'+)
	}

	submitEdit(e: any) {
		e.preventDefault();
		let todo = this.props.newTodo;
		axiosService.put('todos/' + this.props.currentEditId, {
			name: todo.name,
			tags: todo.tags,
			done: todo.completed,
			date: todo.date
		})
			.then((result) => {
				console.log(result.data.id);
				this.toggleAddEditForm();
				this.props.dispatch(action.submitEdit(result.data.id));
			});
	}

	deleteTodo(todo: TodoProps): void {
		console.log('inside delete');
		axiosService.delete('todos/' + todo.id).then(() => {
			this.props.dispatch(action.deleteTodo(todo));
		});
	}

	handleSearch(e: any) {
		let searchKey = e.target.value;
		this.props.dispatch(action.handleSearch(searchKey));
		axiosService.get('todos/search', {
			params: {
				key: searchKey
			}
		}).then((value) => {
			this.props.dispatch(action.getTodos(value.data.data));
		});
	}

	render(): JSX.Element {
		let form = (
			<div className="add-edit-form">
				<TodoForm
					handleChange={this.handleChange}
					handleSubmit={this.props.editStatus ? this.submitEdit : this.addTodo}
					defaultValue={this.props.newTodo}
					editStatus={this.props.editStatus}
					toggleShowForm={this.toggleAddEditForm}
				/>
			</div>
		);
		return (
			<div className="main-wrapper">
				<Search handleChange={this.handleSearch} value={this.props.searchKey}/>
				< Todos
					todos={this.props.todos}
					editTodo={this.showEdit}
					deleteTodo={this.deleteTodo}
					toggleFormView={this.toggleAddEditForm}
				/>

				<button className="add-todo-btn" onClick={this.toggleAddEditForm}>Add New Todo</button>

				{this.props.addEditForm ? form : ''}

			</div>
		);
	}
}

const mapStateToProps = (state: any): any => { return { ...state }; };
const Main = connect(mapStateToProps)(MainWrapper);

export default Main;