export interface TodosProps {
	todos: Array<TodoProps>;
	deleteTodo?: any;
	editTodo?: any;
	toggleFormView?: any;
}

export interface TodoProps {
	name: string;
	id: number;
	done: boolean | string;
	tags?: Array<any>;
	deleteTodo?: any;
	toggleFormView?: any;
	editTodo?: any;
}

export interface StoreProps {
	dispatch: any;
	currentEditId: number;
	editStatus: boolean;
	newTodo: TodoProps;
	searchKey: string;
	todos: Array<TodoProps>;
}

export interface DefaultValueType {
	completed: Array<string>;
	tags: Array<string>;
	edit: EditType;
}

interface EditType {
	name: string;
	tags: Array<string>;
	completed: string;
}