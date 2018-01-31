import * as React from 'react';

function Search(props: any): any {
	return (
		<input
			type="text"
			placeholder="Search for todos...."
			value={props.value}
			onChange={props.handleChange}
			className="search-box"
		/>
		// <input 
		// 	type="text"
		// 	placeholder="Search for todos...."
		// 	value={props.searchKey}
		// 	onChange={props.handleChange}
		// 	className="search-box"
		// />
	);
}

export default Search;