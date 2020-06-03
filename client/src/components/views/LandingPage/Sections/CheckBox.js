import React, {useState} from 'react';
import {Checkbox, Collapse} from "antd";

const {Panel} = Collapse;

function CheckBox({list, handlerFilters}) {

	const [Checked, setChecked] = useState([]);
	const handlerToggle = (value) => {

		// 누른 것의 Index를 구한다.
		const currentIndex = Checked.indexOf(value);
		const newChecked = [...Checked];
		//	전체 Checked 된 State에서 현재 누른 Checkbox가 이미있다면
		if (currentIndex === -1)  //	State 넣어준다.
			newChecked.push(value);
		else  	                  //	빼주고
			newChecked.splice(currentIndex, 1);

		setChecked([
			...newChecked
		]);

		handlerFilters(newChecked)
	};

	const renderCheckboxLists = () => list && list.map((value, index) => (
		<React.Fragment key={index}>
			<Checkbox onChange={() => handlerToggle(value._id)}>
				<span>{value.name}</span>
			</Checkbox>
		</React.Fragment>
	));

	return (
		<div>
			<Collapse defaultActiveKey={['1']}>
				<Panel header="Continents" key="1">
					{renderCheckboxLists()}
				</Panel>
			</Collapse>
		</div>
	);
}

export default CheckBox;