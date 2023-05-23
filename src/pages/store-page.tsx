import React from "react";
import mcdonalds from "../assets/mcdonalds.jpeg";
import "./store-page.css";
import { HorizontalSeparator, Star } from "../utils/commons";
import { Card, Col, Container, Row } from "react-bootstrap";

const ItemCard = () => (
  <Col md={4} xl={2}>
    <Card className="item-card">
      <Card.Img variant="top" src={mcdonalds} />
      <Card.Body>
        <Card.Title>Big Mac</Card.Title>
        <Card.Text className="item-card-description">Yum!</Card.Text>
        <Card.Text>$199.99</Card.Text>
      </Card.Body>
    </Card>
  </Col>
);

const Category = (props: { title: string }) => (
  <div className="store-page-category">
    <span>{props.title}</span>
    <Container>
      <Row className="g-4">
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
      </Row>
    </Container>
  </div>
);

// TODO: adopt DoorDash's more info modal to include address, hours of operations and phone number.
export const StorePage = () => {
  return (
    <div className="page-container">
      <img src={mcdonalds} className="store-page-banner" />
      <div className="store-page-name">
        <span>McDonald's (Marine Drive)</span>
      </div>
      <div>
        <Star star={4.0} /> <span>(200 ratings)</span>
      </div>
      <div className="store-page-description">
        <span>Classic Amercian fast food chain.</span>
      </div>
      <HorizontalSeparator verticallySpaced />
      <div className="store-page-catalogue">
        <div className="store-page-sidebar">
          <ul>
            <li>Popular Items</li>
            <li>Beverages</li>
            <li className="current-category">Wraps</li>
            <li>Chicken</li>
            <li>Beef</li>
          </ul>
        </div>
        <div className="store-page-categories">
          <Category title="Popular Items" />
          <Category title="Beverages" />
          <Category title="Wraps" />
          <Category title="Chicken" />
          <Category title="Beef" />
        </div>
      </div>
    </div>
  );
};
