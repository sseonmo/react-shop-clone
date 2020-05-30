import React, {useState} from 'react';
import {Typography, Button, Form, Input} from "antd";
import FileUpload from "../../utils/FileUpload";
import axios from "axios";

const {Title} = Typography;
const {TextArea} = Input;
const Continents = [
	{key:1, value:"Africa"},
	{key:2, value:"Europe"},
	{key:3, value:"Asia"},
	{key:4, value:"North America"},
	{key:5, value:"South America"},
	{key:6, value:"Australia"},
	{key:7, value:"Antarctica"}
];


function UploadProductPage( props) {

	// eslint-disable-next-line no-undef
	const [Title, setTitle] = useState("");
	const [Description, setDescription] = useState("");
	const [Price, setPrice] = useState(0);
	const [Continent, setContinent] = useState(1);
	const [Images, setImages] = useState([]);

	const titleChangeHandler = (event) => {
		setTitle(event.target.value);
	};

	const descriptionChangeHandler = (event) => {
		setDescription(event.target.value);
	};

	const priceonChangehandler = (event) => {
		setPrice(event.target.value);
	};

	const continentonChangeHandle = (event) => {
		setContinent(event.target.value);
	};

	const updateImage = (newImages) => {
		setImages(newImages);
	};

	const submitHandler = (event) => {
		event.preventDefault();
		// if (!Title || !Description || !Price || !Continent || !Images)
		// 	return alert("모든 값을 넣어주셔야 합니다.");

		// 모든값을 request로 보낸다.
		const body  = {
			writer: props.user.userData._id,
			title: Title,
			description: Description,
			price: Price,
			continent: Continent,
			images: Images
		};

		console.log(body);
		axios.post('/api/product', body)
			.then(response => {
				if (response.data.success) {
					alert('상품업로드에 성공했습니다.');
					props.history.push('/')
				} else {
					alert('상품업로드에 실패했습니다.');
				}
			})


	};

	return (
		<div style={{ maxWidth: '700px', margin: '2rem auto'}}>
			<div style={{ textAlign: 'center', marginBottom: '2rem'}}>
				{/*<Title level={2}>여행 상품 업로드</Title>*/}
				<h2>여행 상품 업로드</h2>
			</div>
			<Form onSubmit={submitHandler}>
				{/* DropZone */}
				<FileUpload refreshFnc={updateImage}/>
				<br/>
				<br/>
				<label>이름</label>
				<Input onChange={titleChangeHandler} value={Title}/>
				<br/>
				<br/>
				<label>설명</label>
				<TextArea onChange={descriptionChangeHandler} value={Description} />
				<br/>
				<br/>
				<label>가격($)</label>
				<Input type="number" onChange={priceonChangehandler} value={Price}/>
				<br/>
				<br/>
				<select onChange={continentonChangeHandle} value={Continent} >
					{Continents.map( (item) => (
						<option key={item.key} value={item.key}>{item.value}</option>
					))}

				</select>
				<br/>
				<br/>
				<Button htmlType="submit" >확인</Button>

			</Form>
		</div>
	);
}

export default UploadProductPage;