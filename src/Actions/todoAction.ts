import { TodoProps } from '../Interfaces/TodoInterface';

export const getTodos = (payload: Array<TodoProps>) => {
	return {
		type: 'GET_TODOS',
		payload
	};
};

export const deleteTodo = (payload: any) => {
	return {
		type: 'DELETE_TODO',
		payload
	};
};

export const handleChange = (changeName: any, payload: any) => {
	return {
		type: 'HANDLE_CHANGE',
		payload: payload,
		changeName: changeName
	};
};

export const toggleAddEditForm = () => {
	return {
		type: 'TOGGLE_ADD_EDIT_FORM'
	};
};

// export const handleDate = (date) => {
//     return {
//         type: 'HANDLE_DATE',
//         payload: date
//     }
// }

export const addTodo = (id: number) => {
	return {
		type: 'ADD_TODO',
		id
	};
};

export const initializeInput = () => {
	return {
		type: 'INITIALIZE_INPUT'
	};
};

// export const handleEditStatus = (payload) => {
//     return {
//         type: 'HANDLE_EDIT_STATUS',
//         payload
//     }
// }

export const initializeEdit = (payload: any) => {
	return {
		type: 'INITIALIZE_EDIT',
		payload
	};
};

export const submitEdit = (id: number) => {
	return {
		type: 'SUBMIT_EDIT',
		id
	};
};

export const handleSearch = (searchKey: string) => {
	return {
		type: 'HANDLE_SEARCH',
		payload: searchKey
	};
};

// export function moveTodo(dragIndex, hoverIndex) {
//     return {
//       type: 'MOVE_TODO',
//       dragIndex,
//       hoverIndex
//     };
//   }