import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {Icon, Col, Card, Row, Button} from 'antd';
import ImagesSlider from "../../utils/ImagesSlider";

const { Meta } = Card;

function LandingPage() {

  const [Products, setProducts] = useState([]);
  useEffect(() => {

        const body = {
        };
        axios.post('/api/product/products')
          .then(response => {
              if (response.data.success) {
                setProducts(response.data.productInfo);
                  console.log(response.data);
              } else {
                  alert("상품들을 가져오는데 실패 했습니다. ")
              }
          })

    }, []);

  const renderCards = Products.map((product, index) => {
    return <Col lg={6} md={6} xs={24}  key={index}>
      <Card cover={<ImagesSlider images={product.images}/>}>
        <Meta title={product.title} description={product.price}/>
      </Card>
    </Col>
  });

    return (
       <div style={{ width: '75%', margin: '3rem auto'}}>

         <div style={{ testAlign: 'center'}}>
           <h2>Let's Travel AnyWhere <Icon type="rocket"/></h2>
         </div>

         {/* Filter */}

         {/* Search */}

         {/* Cards */}
         <div>
           <Row gutter={[16, 16]}>
            {renderCards}
           </Row>
         </div>
         <div style={{ display: 'flex', justifyContent: 'center'}}>
           <Button>더보기</Button>
         </div>
       </div>
    )
}

export default LandingPage
