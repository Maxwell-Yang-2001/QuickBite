import { Button, Offcanvas } from "react-bootstrap";
import { connect } from "react-redux";
import { State } from "../../redux/state";
import {
  Dispatch,
  removeFromCart,
  setCurrentItem,
  toggleCartOffcanvas,
} from "../../redux/action";
import mcdonalds from "../../assets/mcdonalds.jpeg";
import "./cartOffcanvas.css";
import { Link } from "react-router-dom";
import { HorizontalSeparator } from "../commons";
import { Trash } from "../../assets";

const mapStateToProps = (state: State) => ({
  cart: state.cart,
  cartOffcanvasOpen: state.cartOffcanvasOpen,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  toggleCartOffcanvas: () => dispatch(toggleCartOffcanvas()),
  setCurrentItem: (currentItem: string) =>
    dispatch(setCurrentItem(currentItem)),
  removeFromCart: (itemId: string) => dispatch(removeFromCart(itemId)),
});

const CartOffcanvas = (props: {
  cart: { [itemId: string]: number };
  cartOffcanvasOpen: boolean;
  toggleCartOffcanvas: () => void;
  setCurrentItem: (currentItem: string) => void;
  removeFromCart: (itemId: string) => void;
}) => {
  let itemCount = 0,
    subtotal = 0;
  Object.entries(props.cart).forEach(([_, value]) => {
    itemCount += value;
    subtotal += value * 199.99;
  });

  return (
    <Offcanvas
      show={props.cartOffcanvasOpen}
      placement="end"
      onHide={props.toggleCartOffcanvas}
      className="cart-offcanvas"
    >
      <Offcanvas.Header closeButton></Offcanvas.Header>
      <Offcanvas.Body>
        {Object.keys(props.cart).length === 0 ? (
          <>
            <p className="cart-offcanvas-title">Shopping Cart</p>
            <p className="cart-offcanvas-empty-message">
              The cart is currently empty.
            </p>
          </>
        ) : (
          <>
            <Link to="/store" className="cart-offcanvas-title">
              Mcdonald's (Marine Drive)
            </Link>
            <p className="cart-offcanvas-subtitle">
              <span>
                {itemCount} item{itemCount === 1 ? "" : "s"}
              </span>
              <span className="cart-offcanvas-subtotal">
                Subtotal: ${subtotal.toFixed(2)}
              </span>
            </p>
            <Button className="quick-bite-button quick-bite-bg cart-offcanvas-checkout-button">
              Go to Checkout
            </Button>
            <HorizontalSeparator verticallySpaced={false} />
            {Object.entries(props.cart).map(([itemId, value], index) => (
              <div
                className="cart-offcanvas-item"
                key={`item-${index}`}
                onClick={() => props.setCurrentItem(itemId)}
              >
                <div>
                  <span className="cart-offcanvas-item-title">Big Mac</span>
                  <img
                    src={mcdonalds}
                    alt="item"
                    className="cart-offcanvas-item-image"
                  />
                </div>
                <div className="d-flex align-items-center">
                  <span className="cart-offcanvas-item-units">
                    Unit(s): {value}
                  </span>
                  <span className="cart-offcanvas-item-subtotal">
                    ${(value * 199.99).toFixed(2)}
                  </span>
                  <Trash
                    className="cart-offcanvas-item-trash"
                    onClick={(e) => {
                      console.log(e);
                      e.stopPropagation();
                      props.removeFromCart(itemId);
                    }}
                  />
                </div>
                <HorizontalSeparator verticallySpaced={false} />
              </div>
            ))}
          </>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CartOffcanvas);
