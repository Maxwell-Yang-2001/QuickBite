import { Offcanvas } from "react-bootstrap";
import { connect } from "react-redux";
import { State } from "../../redux/state";
import { Dispatch, toggleCartOffcanvas } from "../../redux/action";

const mapStateToProps = (state: State) => ({
  cart: state.cart,
  cartOffcanvasOpen: state.cartOffcanvasOpen,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  toggleCartOffcanvas: () => dispatch(toggleCartOffcanvas()),
});

const CartOffcanvas = (props: {
  cart: { [itemId: string]: number };
  cartOffcanvasOpen: boolean;
  toggleCartOffcanvas: () => void;
}) => {
  return (
    <Offcanvas
      show={props.cartOffcanvasOpen}
      placement="end"
      onHide={props.toggleCartOffcanvas}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {Object.keys(props.cart).length === 0 ? (
          <span>Oopsie daisy, add something!</span>
        ) : (
          <span>You have {Object.keys(props.cart).length} items...</span>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CartOffcanvas);
