import * as React from 'react';
import { TagsProps } from '../Interfaces/TodoInterface';

function AddTodo(props: any) {
	let defaultTags = props.defaultTags.map((tag: TagsProps) => {
		return (
			<span  key={tag.id}>
				<input type="checkbox" name="tags" value={tag.id} onClick={props.handleChange}/>{tag.tagName}
			</span>
		);
	});
	// let a: string = 'blah';
	return (
		<div className="add-edit-form-content">
			<span className="close" onClick={props.toggleShowForm}>&times;</span>
			<div className="form-content-header"><h3> {props.editStatus ? 'Edit' : 'Add'} Todo </h3></div>
			<form className="form-content-body">
				<div>
					<label>Name</label><br />
					<input type="text" onChange={props.handleChange} name="name" value={props.defaultValue.name} />
				</div>
				<div>
					<label>Tags</label><br />
					{defaultTags}
				</div>
				<div>
					<label>Completed</label>
					<select name="completed" onChange={props.handleChange}>
						<option value="false">false</option>
						<option value="true">true</option>
					</select>
				</div>
				<button type="submit" onClick={props.handleSubmit} className="form-submit-button">
					{props.editStatus ? 'Save' : 'Add'}
				</button>
			</form>
		</div>
	);
}

export default AddTodo;