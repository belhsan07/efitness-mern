import React, { useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import ProductsPage from '../components/ProductsPage';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listEquipment } from '../actions/productActions';

const Equipment = () => {
  const dispatch = useDispatch();

  // we get the state of "productList" from store.js
  // this is where we store the whole state of our app
  const productList = useSelector((state) => state.productList);

  // then from our prodcutList, we pull out loading, error, and products
  const { loading, error, products } = productList;

  useEffect(() => {
    // We trigger or dispatch the listEquipment action from our action file
    dispatch(listEquipment());
  }, [dispatch]);

  return (
    <>
      {/* If loading, render loader */}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Container>
          <Row>
            <h2>Equipment</h2>
            {/* Map throught products. For each product send its data to Products page prop */}
            {products.map((product) => (
              <Col sm={12} md={6} lg={4} xl={4} key={product._id}>
                <ProductsPage product={product} />
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </>
  );
};

export default Equipment;
