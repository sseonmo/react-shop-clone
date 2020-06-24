import React, {useEffect, useState} from 'react';
import ImageGallery from "react-image-gallery";

function ProdcutImages({ detail }) {

	const [Images, setImages] = useState([]);

	useEffect(() => {
		console.log("@@@@", detail);
		console.log(detail.images);
		if (detail.images && detail.images.length > 0) {
			let images = [];

			detail.images.map(item => {

				images.push({
					original: `http://localhost:5000/${item}`,
					thumbnail: `http://localhost:5000/${item}`
				})
			});
			setImages(images)

		}
		console.log("@@@@", Images);
	}, [detail]);

	return (
		<div>
			<ImageGallery items={Images} />
		</div>
	);
}

export default ProdcutImages;