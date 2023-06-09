import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Dispatch, setCurrentItem, addToCart } from "../../redux/action";
import { connect } from "react-redux";
import mcdonalds from "../../assets/mcdonalds.jpeg";
import { PlusCircle, DashCircle } from "../../assets";
import { useEffect, useState } from "react";

const mapStateToProps = (state: { currentItem?: string }) => ({
  currentItem: state.currentItem,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  clearCurrentItem: () => dispatch(setCurrentItem(undefined)),
  addToCart: (quantity: number) => dispatch(addToCart(quantity)),
});

const ItemModal = (props: {
  currentItem?: string;
  clearCurrentItem: () => void;
  addToCart: (quantity: number) => void;
}) => {
  const [itemCount, setItemCount] = useState(1);
  const unitPrice = 199.99;
  const lower = 1,
    upper = 99;

  useEffect(() => {
    if (props.currentItem) {
      setItemCount(1);
    }
  }, [props.currentItem]);

  return (
    <Modal
      size="lg"
      aria-labelledby="modal-title-vcenter"
      centered
      show={props.currentItem !== undefined}
      onHide={props.clearCurrentItem}
      className="item-modal"
    >
      <Modal.Header closeButton className="item-modal-header"></Modal.Header>
      <Modal.Body>
        <img src={mcdonalds} alt="item" className="item-modal-image" />
        <p className="item-modal-title">Big Mac</p>
        <p className="item-modal-price">$199.99</p>
        <p>Yum!</p>
      </Modal.Body>
      <Modal.Footer className="item-modal-footer">
        <div className="item-modal-update-count-container">
          <DashCircle
            onClick={(_) => {
              if (itemCount <= lower) return;
              setItemCount(itemCount - 1);
            }}
            className={`clickable themed-content${
              itemCount <= lower ? " disabled" : ""
            }`}
          />
          <span>{itemCount}</span>
          <PlusCircle
            onClick={(_) => {
              if (itemCount >= upper) return;
              setItemCount(itemCount + 1);
            }}
            className={`clickable themed-content${
              itemCount >= upper ? " disabled" : ""
            }`}
          />
        </div>
        <Button
          className="quick-bite-button quick-bite-bg item-modal-add-button"
          onClick={(_) => {
            props.addToCart(itemCount);
            props.clearCurrentItem();
          }}
        >
          Add to cart - ${(unitPrice * itemCount).toFixed(2)}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemModal);

