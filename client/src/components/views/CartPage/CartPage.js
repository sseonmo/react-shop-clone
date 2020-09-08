import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import { getCartItems, removeCartItem} from "../../../_actions/user_actions";
import UserCardBlock from "./Section/UserCardBlock"
import { Empty } from 'antd';

function CartPage(props) {
	const dispatch = useDispatch();

	const [Total, setTotal] = useState(0);
	const [ShowTotal, setShowTotal] = useState(true);

	useEffect(() =>{
		let cartItems = [];
		console.log("@@@@@@@@@@",props);
		// 리덕스 User state안에 cart 안에 상품이 있는지 확인한다.
		if(props.user.userData && props.user.userData.cart ){
			if (props.user.userData.cart.length > 0) {
				props.user.userData.cart.forEach( item => {
					cartItems.push(item.id)
				});

				dispatch(getCartItems(cartItems, props.user.userData.cart))
					.then(response => calculatetotal(response.payload));
			}

		}
	}, [props.user.userData]);

	let calculatetotal = (cartDetail) => {
		let total = 0;
		cartDetail && cartDetail.forEach((item) => {
			total += parseInt(item.price, 10) * parseInt(item.quantity, 10);
		});
		setTotal(total);
	};

	let removeFromCart = (productId) => {
		dispatch(removeCartItem(productId))
			.then(response => {
				if (response.payload.productInfo.length <= 0) {
					setShowTotal(false);
				}

			})
	};

	return (
		<div style={{ width: '85%', margin: '3rem auto'}}>
			<h1>My Cart</h1>
			<div>
				<UserCardBlock products={props.user.cartDetail} removeItem={removeFromCart}/>
			</div>
			{ShowTotal ?
				<div style={{marginTop: '3rem'}}>
					<h2>Total Amount: {Total} 원</h2>
				</div>
				:
				<>
					<br/>
					<Empty description={false}/>
				</>
			}
		</div>
	);
}

export default CartPage;

