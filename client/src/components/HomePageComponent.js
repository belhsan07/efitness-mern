import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Card } from 'react-bootstrap';

const HomePageComponent = ({ src, title, link }) => {
  return (
    <Col sm={12} md={6} lg={4} xl={3}>
      <Link to={link}>
        <Card.Img src={src} variant="top"></Card.Img>
      </Link>
      <Card.Title>
        <strong>{title}</strong>
      </Card.Title>
    </Col>
  );
};

export default HomePageComponent;
