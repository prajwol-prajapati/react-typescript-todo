// import {combineReducers} from 'redux';
import * as moment from 'moment';

const INITIALSTATE: InitialState = {
	todos: [],
	newTodo: {
		id: 1,
		name: '',
		tags: [],
		completed: 'false',
		date: moment()
	},
	defaultTags: [],
	editStatus: false,
	currentEditId: 0,
	searchKey: '',
	idCounter: 6,
	addEditForm: false,
};

const allReducer = (state = INITIALSTATE, action: Action) => {
	let changeName = action.changeName;
	let obj = { ...state.newTodo, id: action.id };
	let array1 = [1, 2, 3];
	let example2 = array1.map((a) => {
		if (a === 1) {
			a = 5;
		}
		return a;
	});
	let example = state.todos.map((todo) => {
		if (todo.id === state.currentEditId) {
			todo = obj;

		}
	});
	// let editObj = { ...state.newTodo, id: state.currentEditId };
	// let currentTodos = state.todos
	// let updatedTodos = [...state.todos, obj];
	// let updatedTodos = currentTodos.push(obj);
	// let updatedTodos = {...currentTodos, todos: currentTodos.push(obj)}

	switch (action.type) {

		case 'GET_TODOS':
			return { ...state, todos: action.payload };

		case 'GET_TAGS':
			return { ...state, defaultTags: action.payload };

		case 'HANDLE_CHANGE':
			if (changeName === 'tags') {
				return {
					...state,
					newTodo: {
						...obj,
						[changeName]: [...obj[changeName], action.payload]
					}
				};
			}

			return {
				...state,
				newTodo: {
					...obj,
					[changeName]: action.payload
				}
			};

		case 'TOGGLE_ADD_EDIT_FORM':
			return {
				...state,
				addEditForm: !state.addEditForm
			};

		case 'ADD_TODO':
			return {
				...state,
				todos: [
					...state.todos,
					obj
				]
			};

		case 'INITIALIZE_INPUT':
			return {
				...state,
				newTodo: {
					id: 1,
					name: '',
					tags: [],
					completed: 'false',
					date: moment()
				}
			};

		case 'INITIALIZE_EDIT':
			let temp = state.todos.filter((todo) => { return action.payload.id === todo.id; });
			console.log(temp);
			return {
				...state,
				editStatus: true,
				currentEditId: action.payload.id,
				newTodo: temp[0]
			};

		case 'DELETE_TODO':
			let tempTodo = state.todos.filter((todo) => { return action.payload.id !== todo.id; });
			return { ...state, todos: tempTodo };

		case 'SUBMIT_EDIT':
			console.log(example, '--------');
			console.log(example2, '-----+++++++++++=---');
			return {
				...state, todos: state.todos.map((todo) => {
					console.log(todo);
					if (todo.id === state.currentEditId) {
						todo = obj;
						console.log(todo, '==========');

					}
					return todo;
				}),
				editStatus: false
			};

		case 'HANDLE_SEARCH':
			return { ...state, searchKey: action.payload };

		default:
			return state;
	}
};

export default allReducer;

interface Action {
	type: string;
	payload?: any;
	changeName: string;
	id: number;
}

interface InitialState {
	todos: Array<any>;
	newTodo: any;
	editStatus: boolean;
	currentEditId: number;
	searchKey: string;
	idCounter: number;
	addEditForm: boolean;
	defaultTags: Array<any>;
}