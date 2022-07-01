import React, { useEffect } from 'react';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
  Container,
} from 'react-bootstrap';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../actions/cartActions';

import './pages.css';

const Cart = ({ history }) => {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  // Can get params.id by using useParams from react-router-dom
  // the id or whatever name is in the router App.js
  const productId = params.id;

  const qty = Number(new URLSearchParams(location.search).get('qty'));

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  // Takes in productId
  const removeFromCartHandler = (productId) => {
    // dispatch removeFromCart action with that Id
    dispatch(removeFromCart(productId));
  };

  const checkOutHandler = () => {
    navigate('/login?redirect=/shipping');
  };

  useEffect(() => {
    // if productId exists
    if (productId) {
      // we can dispatch addToCart action from cartAction
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);
  return (
    <Container>
      <h1 className="row">Shopping Cart</h1>
      <Row className="top">
        <Col md={8}>
          {cartItems.length === 0 ? (
            <Message>
              Your cart is empty. <Link to="/shop"> Shop Now.</Link>
            </Message>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link to={`/${item.category}/${item.product}`}>
                        {item.name}
                      </Link>
                    </Col>
                    <Col md={2}>${item.price}</Col>
                    <Col md={2}>
                      <Form.Control
                        as="select"
                        value={item.qty}
                        onChange={(e) => {
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          );
                        }}
                        style={{ textAlign: 'center' }}
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>
                  Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  ) items
                </h2>
                $
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block btn btn-dark"
                  disabled={cartItems.length === 0}
                  onClick={checkOutHandler}
                >
                  Proceed To CheckOut
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;
