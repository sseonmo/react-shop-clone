import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {Icon, Col, Card, Row, Button} from 'antd';
import ImagesSlider from "../../utils/ImagesSlider";
import CheckBox from "./Sections/CheckBox";
import { continents } from "./Sections/Datas";

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

	useEffect(() => {

    let body = {
      skip: Skip,
      limit: Limit
    };

    console.log(body);
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

	const loadMoreHandler = () =>{
    let skip = Skip + Limit;

    let body = {
      skip,
      limit: Limit,
	    loadMore: true
    };
     getProduct(body);
     setSkip(skip);
  };

	const renderCards = Products.map((product, index) => {
		return <Col lg={6} md={6} xs={24} key={index}>
			<Card cover={<ImagesSlider images={product.images}/>}>
				<Meta title={product.title} description={product.price}/>
			</Card>
		</Col>
	});

	const showFilterResults = (filters) => {
		let body = {
			skip : 0,
			limit: Limit,
			filters
		};

		getProduct(body);
		setSkip(0);

	};


	const handlerFilters = (filters, category) => {
		const newFilters = {...Filter};
		newFilters[category] = filters;

		showFilterResults(newFilters);
	};

	return (
		<div style={{width: '75%', margin: '3rem auto'}}>

			<div style={{testAlign: 'center'}}>
				<h2>Let's Travel AnyWhere <Icon type="rocket"/></h2>
			</div>

			{/* Filter */}
			{/* Check Box*/}
				<CheckBox list={continents} handlerFilters={filters => handlerFilters(filters, "continents")}/>
			{/* RadioBox */}

			{/* Search */}

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
