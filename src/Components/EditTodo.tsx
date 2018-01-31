import * as React from 'react';

export default function EditTodo(props: any) {
	return (
		<div className="edit-form">
			<h3>Edit</h3>
			<form>
			<div>
			<label>Name</label><br/>
			<input type="text" name="name"/>

		</div><br/>
		<div>
			<label>Tags</label><br/>
			<input type="checkbox" name="tags" value="tag1" defaultChecked={true}/>tag1 <br/>
			<input type="checkbox" name="tags" value="tag2"/>tag2 <br/>
			<input type="checkbox" name="tags" value="tag3"/>tag3 <br/>
		</div> <br />
		<div>
			<label> Completed </label> <br/>
			<select name="completed">
						<option value="false">false</option>
						<option value="true">true</option>
					</select>
		</div> <br />
		<button type="submit">Edit</button>
			</form>
		</div>
	);
}