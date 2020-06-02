import React from 'react';
import {Carousel} from 'antd';

function ImagesSlider({images}) {
	return (
		<div>
			<Carousel autoplay={true}>
				{images && images.map((image, index) => (
					<div key={index}>
						<img
							src={`http://localhost:5000/${image}`}
							style={{ width: '100%', height: '300px'}} />
					</div>
				))}
			</Carousel>
		</div>
	);
}

export default ImagesSlider;