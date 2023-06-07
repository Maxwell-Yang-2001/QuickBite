import React from "react";
import mcdonalds from "../../assets/mcdonalds.jpeg";
import "./store-page.css";
import { HorizontalSeparator, Star } from "../commons";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Dispatch, setCurrentItem } from "../../redux/action";
import { connect } from "react-redux";
import ItemModal from "./item-modal";
import TopNavigator from "../topNavigator";
import { PAGE } from "../../utils/constants";

const mapDispatchToItemCardProps = (dispatch: Dispatch) => ({
  setCurrentItem: (currentItem: string) =>
    dispatch(setCurrentItem(currentItem)),
});

const ItemCard = connect(
  undefined,
  mapDispatchToItemCardProps
)((props: { itemId: string, setCurrentItem: (currentItem: string) => void }) => (
  <Col md={4} xl={2}>
    <Card className="item-card" onClick={() => props.setCurrentItem(props.itemId)}>
      <Card.Img variant="top" src={mcdonalds} />
      <Card.Body>
        <Card.Title>Big Mac-{props.itemId}</Card.Title>
        <Card.Text>$199.99</Card.Text>
      </Card.Body>
    </Card>
  </Col>
));

const getSidebarCategoryId = (category: string) =>
  `store-page-sidebar-category-${getCategoryId(category)}`;
const getCatalogueCategoryId = (category: string) =>
  `store-page-catalogue-category-${getCategoryId(category)}`;

const getCategoryId = (category: string) =>
  category.toLowerCase().split(" ").join("-");

const Category = (props: { title: string }) => (
  <div
    className="store-page-catalogue-category"
    id={getCatalogueCategoryId(props.title)}
  >
    <span>{props.title}</span>
    <Container>
      <Row className="g-4">
        <ItemCard itemId="a" />
        <ItemCard itemId="b" />
        <ItemCard itemId="c" />
        <ItemCard itemId="d" />
        <ItemCard itemId="e" />
        <ItemCard itemId="f" />
        <ItemCard itemId="g" />
        <ItemCard itemId="h" />
        <ItemCard itemId="i" />
      </Row>
    </Container>
  </div>
);

// https://stackoverflow.com/a/5354536, short version
const checkVisible = (elm: HTMLElement) => {
  var rect = elm.getBoundingClientRect();
  var viewHeight = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight
  );
  return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
};

// TODO: adopt DoorDash's more info modal to include address, hours of operations and phone number.
export class StorePage extends React.Component<
  any,
  { currentCategoryIndex: number }
> {
  categories = ["Popular Items", "Beverages", "Wraps", "Chicken", "Beef"];
  // on scroll, check if the current focused category requires an update.
  scrollListener = (_: any) => {
    let index = this.state.currentCategoryIndex;
    let currentElement = document.getElementById(
      getCatalogueCategoryId(this.categories[index])
    );
    if (!currentElement) return;
    if (checkVisible(currentElement)) {
      // current element is visible - go to the previous category until the first one visible
      while (index >= 1) {
        index--;
        currentElement = document.getElementById(
          getCatalogueCategoryId(this.categories[index])
        );
        if (!currentElement || !checkVisible(currentElement)) {
          index++;
          break;
        }
      }
    } else {
      // current element is invisible - go to the next category until the first one visible
      while (index < this.categories.length - 1) {
        index++;
        currentElement = document.getElementById(
          getCatalogueCategoryId(this.categories[index])
        );
        if (currentElement && checkVisible(currentElement)) {
          break;
        }
      }
    }
    if (index !== this.state.currentCategoryIndex) {
      this.setState({
        currentCategoryIndex: index,
      });
    }
  };

  constructor(props: any) {
    super(props);
    this.state = { currentCategoryIndex: 0 };
  }

  componentDidMount = () => {
    window.addEventListener("scroll", this.scrollListener);
  };

  componentWillUnmount(): void {
    window.removeEventListener("scroll", this.scrollListener);
  }

  render = () => {
    return (
      <>
      <TopNavigator page={PAGE.Store} />
      <div className="page-container">
        <ItemModal />
        <img src={mcdonalds} className="store-page-banner" alt="store-banner" />
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
        <div className="store-page-main">
          <div className="store-page-sidebar">
            <ul>
              {this.categories.map((category) => (
                <li
                  key={category}
                  id={getSidebarCategoryId(category)}
                  onClick={(_) => {
                    document
                      .getElementById(getCatalogueCategoryId(category))
                      ?.scrollIntoView();
                  }}
                  className={
                    this.categories[this.state.currentCategoryIndex] ===
                    category
                      ? "current-category"
                      : ""
                  }
                >
                  {category}
                </li>
              ))}
            </ul>
          </div>
          <div className="store-page-catalogue">
            {this.categories.map((category) => (
              <Category title={category} key={category} />
            ))}
          </div>
        </div>
      </div>
      </>
    );
  };
}
