import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Dispatch, setCurrentItem } from "../../redux/action";
import { connect } from "react-redux";

const mapStateToProps = (state: { currentItem?: string }) => ({
  currentItem: state.currentItem,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  clearCurrentItem: () => dispatch(setCurrentItem(undefined)),
});

const ItemModal = (props: {
  currentItem?: string;
  clearCurrentItem: () => void;
}) => {
  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={props.currentItem !== undefined}
      onHide={() => props.clearCurrentItem()}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => props.clearCurrentItem()}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemModal);
