import React from 'react';
import {Badge, Button, Descriptions} from "antd";
import { useDispatch } from "react-redux";
import { addToCart} from "../../../../_actions/user_actions";

function ProductInfo({detail}) {
	const dispatch = useDispatch();

	console.log(detail);
	const clickHandler = () => {
		// 필요한 정보를 cart 필드에 넣어준다.
		dispatch(addToCart(detail._id));
	};
	return (
		<div>
			<Descriptions title="Product Info" bordered>
				<Descriptions.Item label="Price">{detail.price}</Descriptions.Item>
				<Descriptions.Item label="Sold">{detail.sold}</Descriptions.Item>
				<Descriptions.Item label="View">{detail.views}</Descriptions.Item>
				<Descriptions.Item label="Description">{detail.description}</Descriptions.Item>
			</Descriptions>
			<br />
			<br />
			<div style={{ display: 'flex', justifyContent: 'center'}}>
				<Button size="large" shape="round" type="danger" onClick={clickHandler} >
					Add to Cart
				</Button>
			</div>
		</div>
	);
}

export default ProductInfo;