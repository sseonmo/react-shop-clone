import React, {useEffect} from 'react';
import axios from 'axios';

function DetailProductPage(props) {
	// console.log(props.match.params);
	const productId = props.match.params.productId || '';
	useEffect(() => {
		axios.get(`/api/product/product_by_id?id=${productId}&type=single`)
			.then(response => {
				if (response.data.success) {
					console.log(response);
				} else {
					alert('상세페이지를 가져오는데 실패했습니다.');
				}
			});
	}, []);

	return (
		<div>
			DetailProductPage
		</div>
	);
}

export default DetailProductPage;