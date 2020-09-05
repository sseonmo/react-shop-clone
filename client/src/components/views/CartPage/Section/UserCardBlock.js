import React from 'react';
import "./UserCardBlock.css"

function UserCardBlock(props) {

	const renderCartImage = (images) => {
		if (images.length > 0) {
			let image = images[0];
			return `http://localhost:5000/${image}`;
		}
	};

	const renderItems = () => (
		props.products && props.products.map(product => (
			<tr key={product._id}>
				<td><img style={{width: '70px'}} src={renderCartImage(product.images)} alt="product"/></td>
				<td>{product.quantity}</td>
				<td>{product.price}</td>
				<td>
					<button>Remove</button>
				</td>
			</tr>
		))
	);


	return (
		<div>
			<table>
				<thead>
				<tr>
					<th>Product Image</th>
					<th>Product Quantity</th>
					<th>Product Price</th>
					<th>Remove from Cart</th>
				</tr>
				</thead>
				<tbody>
					{renderItems()}
				</tbody>
			</table>
		</div>
	);
}

export default UserCardBlock;