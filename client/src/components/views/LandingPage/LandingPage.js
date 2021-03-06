import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {Icon, Col, Card, Row, Button} from 'antd';
import ImagesSlider from "../../utils/ImagesSlider";
import CheckBox from "./Sections/CheckBox";
import RadioBox from "./Sections/RadioBox";
import {continents, price} from "./Sections/Datas";
import SearchFeature from "./Sections/SearchFeature";


const {Meta} = Card;

function LandingPage() {

	const [Products, setProducts] = useState([]);
	const [Skip, setSkip] = useState(0);
	const [Limit, setLimit] = useState(8);
	const [PostSize, setPostSize] = useState(0);
	const [Filter, setFilter] = useState({
		continents: [],
		price: []
	});
	const [SearchTerm, setSearchTerm] = useState('');

	useEffect(() => {
		let body = {
			skip: Skip,
			limit: Limit,
			searchTerm: SearchTerm
		};

		getProduct(body);

	}, []);


	const getProduct = (body) => {

		axios.post('/api/product/products', body)
			.then(response => {

				if (response.data.success) {

					if (body.loadMore) {
						setProducts([
							...Products,
							...response.data.productInfo
						]);
					} else {
						setProducts([
							...response.data.productInfo
						]);
					}

					setPostSize(response.data.postSize);
				} else {
					alert("상품들을 가져오는데 실패 했습니다. ")
				}
			})
	};

	const loadMoreHandler = () => {
		let skip = Skip + Limit;

		let body = {
			skip,
			limit: Limit,
			loadMore: true,
			searchTerm: SearchTerm
		};
		getProduct(body);
		setSkip(skip);
	};

	const renderCards = Products.map((product, index) => {
		return <Col lg={6} md={6} xs={24} key={index}>
			<Card cover={<a href={`/product/${product._id}`}><ImagesSlider images={product.images}/></a>}>
				<Meta title={product.title} description={product.price}/>
			</Card>
		</Col>
	});

	const showFilterResults = (filters) => {
		let body = {
			skip: 0,
			limit: Limit,
			filters,
			searchTerm: SearchTerm
		};

		getProduct(body);
		setSkip(0);
	};

	const handlerFilters = (filters, category) => {

		const newFilters = {...Filter};
		newFilters[category] = filters;

		// price 일때
		if (category === 'price') {
			for (let key in price) {
				if (price[key]._id === filters) {
					newFilters[category] = price[key].array;
				}
			}
		}

		showFilterResults(newFilters);
		setFilter(newFilters)
	};

	const updateSearchTerm = (newSearchTerm) => {

		let body = {
			skip : 0,
			limit: Limit,
			filters: Filter,
			searchTerm: newSearchTerm
		};
		setSkip(0);
		setSearchTerm(newSearchTerm);
		getProduct(body)
	};
	return (
		<div style={{width: '75%', margin: '3rem auto'}}>

			<div style={{testAlign: 'center'}}>
				<h2>Let's Travel AnyWhere <Icon type="rocket"/></h2>
			</div>

			{/* Filter */}
			<Row gutter={[16, 16]}>
				<Col lg={12} xs={24}>
					{/* Check Box*/}
					<CheckBox list={continents} handlerFilters={filters => handlerFilters(filters, "continents")}/>
				</Col>
				<Col lg={12} xs={24}>
					{/* RadioBox */}
					<RadioBox list={price} handlerFilters={filters => handlerFilters(filters, "price")}/>
				</Col>
			</Row>

			{/* Search */}
			<div style={{ display: 'flex', justifyContent: 'flex-end', margin: '1rem auto'}}>
				<SearchFeature refreshFnc={updateSearchTerm} />
			</div>
			{/* Cards */}
			<Row gutter={[16, 16]}>
				{renderCards}
			</Row>
			<br/>
			{PostSize >= Limit &&
			<div style={{display: 'flex', justifyContent: 'center'}}>
				<Button onClick={loadMoreHandler}>더보기</Button>
			</div>
			}
		</div>
	)
}

export default LandingPage
