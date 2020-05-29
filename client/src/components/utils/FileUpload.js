import React, {useState} from 'react';
import Dropzone from "react-dropzone";
import {Icon} from 'antd';
import axios from 'axios';

function FileUpload({refreshFnc}) {

	const [Images, setImages] = useState([]);

	const dropHandler = (files) => {
		let formData = new FormData();

		const config = {
			header: {'content-type': 'multipart/form-data'}
		};

		formData.append('file', files[0]);

		axios.post('/api/product/image', formData, config)
			.then(response => {
				if (response.data.success) {
					setImages([...Images, response.data.filePath]);
					refreshFnc([...Images, response.data.filePath]);
				} else {
					console.log(response.data.err);
					alert('파일을 저장하는데 실패했습니다.')
				}
			});
	};

	const deleteHandler = (image) => {
		const currentIndex = Images.indexOf(image);
		let newImages = [...Images];
		newImages.splice(currentIndex,1);
		setImages(newImages);
		refreshFnc(newImages);
	};

	return (
		<div style={{display: 'flex', justifyContent: 'space-between'}}>
			<Dropzone onDrop={dropHandler}>
				{({getRootProps, getInputProps}) => (
					<section>
						<div style={{
							width: 300, height: 240, border: '1px solid lightgray',
							display: 'flex', alignItems: 'center', justifyContent: 'center'
						}} {...getRootProps()}
						>
							<input {...getInputProps()} />
							<Icon type="plus" style={{fontSize: '3rem'}}/>
						</div>
					</section>
				)}
			</Dropzone>

			<div style={{ display: 'flex', width: '350px', height: '240px', overflow: 'auto' }}>
				{Images.length > 0 && Images.map((image, index) => (
					<div key={index} onClick={() => deleteHandler(image)} >
						<img src={`http://localhost:5000/${image}`} style={{ minWidth: '300px', width: '300px', height: '240px'}} />
					</div>
				))}

			</div>
		</div>
	);
}

export default FileUpload;