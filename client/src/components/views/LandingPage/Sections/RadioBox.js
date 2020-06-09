import React, {useState} from 'react';
import {Radio, Collapse} from "antd";

const {Panel} = Collapse;

function RadioBox({list, handlerFilters}) {

	const [Value, setValue] = useState(0);

	const renderRadiobox = () => list && list.map((value, index) => (
		<Radio key={index} value={value._id}>
			{ value.name}
		</Radio>
	));

	const handlerChange = (e) => {
		setValue(e.target.value);
		handlerFilters(e.target.value);
	};

	return (
		<div>
			<Collapse defaultActiveKey={[0]}>
				<Panel header="Price" key="1">
					<Radio.Group onChange={handlerChange} >
						{renderRadiobox()}
					</Radio.Group>
				</Panel>
			</Collapse>
		</div>
	);
}

export default RadioBox;