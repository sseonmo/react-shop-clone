import React, {useState} from 'react';
import { Input } from 'antd';
const { Search } = Input;

function SearchFeature({ refreshFnc }) {

	const [SearchTerm, setSearchTerm] = useState("");

	const searchHandler = (e) => {
		console.log(e.target.value);
		console.log(e.currentTarget.value);
		setSearchTerm(e.target.value);
		refreshFnc(e.target.value);
	};

	return (
		<div>
			<Search
				placeholder="input search text"
				onChange={searchHandler}
				value={SearchTerm}
				style={{ width: 200 }} />
		</div>
	);
}

export default SearchFeature;