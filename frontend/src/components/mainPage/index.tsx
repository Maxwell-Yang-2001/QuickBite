import React from "react";
import { Spinner, Star } from "../commons";
import { Card, Col, Container, Row } from "react-bootstrap";
import mcdonalds from "../../assets/mcdonalds.jpeg";
import "./main-page.css";
import { Link } from "react-router-dom";
import TopNavigator from "../topNavigator";
import { PAGE } from "../../utils/constants";

const StoreCard = () => (
  <Col xs={12} md={6} xl={4}>
    <Link to="/store" className="invisible-link">
      <Card className="store-card">
        <Card.Img variant="top" src={mcdonalds} />
        <Card.Body>
          <Card.Title>McDonald's (Marine Drive)</Card.Title>
          <Card.Text>Classic Amercian fast food chain.</Card.Text>
          <Star star={4} />
        </Card.Body>
      </Card>
    </Link>
  </Col>
);

export const MainPage = () => (
  <>
  <TopNavigator page={PAGE.Home} />
  <div className="page-container">
    <Container>
      <Row className="g-4">
        <StoreCard />
        <StoreCard />
        <StoreCard />
        <StoreCard />
        <StoreCard />
        <StoreCard />
        <StoreCard />
        <StoreCard />
        <StoreCard />
      </Row>
    </Container>
  </div>
  </>
);
