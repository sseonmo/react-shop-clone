import React, {useEffect, useState} from 'react';
import axios from 'axios';
import ProdcutImages from "./Sections/ProdcutImages";
import ProductInfo from "./Sections/ProductInfo";
import {Col, Row} from "antd";

function DetailProductPage(props) {

	const productId = props.match.params.productId || '';

	const [Product, setProduct] = useState({});
	useEffect(() => {
		axios.get(`/api/product/products_by_id?id=${productId}&type=single`)
			.then(response => {
				console.log('fetch Product Infomation',response);
				setProduct(response.data[0]);
			})
			.catch(err => alert(err));
	}, []);

	return (
		<div style={{ width: '100%', padding: '3rem 4rem'}}>
			<div style={{ display: 'flex', justifyContent: 'Center'}}>
				<h1>{Product.title}</h1>
			</div>
			<br/>
			<Row gytter={[16, 16]}>
				<Col lg={12} sm={24}>
					{ /* ProductImage*/ }
					<ProdcutImages detail={Product} />
				</Col>
				<Col lg={12} sm={24}>
					{/* ProductInfo*/ }
					<ProductInfo detail={Product} />
				</Col>
			</Row>

		</div>
	);
}

export default DetailProductPage;