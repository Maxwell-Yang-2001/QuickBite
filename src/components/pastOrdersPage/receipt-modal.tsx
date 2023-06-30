import Modal from "react-bootstrap/Modal";
import { Order } from "../../redux/state";
import { HorizontalSeparator } from "../commons";

const ReceiptModal = (props: {
  order: Order | undefined;
  setOrder: (o: Order | undefined) => void;
}) => {
  if (!props.order) {
    return <></>;
  }
  return (
    <Modal
      size="lg"
      aria-labelledby="modal-title-vcenter"
      centered
      show={props.order !== undefined}
      onHide={() => props.setOrder(undefined)}
      dialogClassName="receipt-modal-dialog"
      className="receipt-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>Receipt</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="receipt-modal-title">
          Thank you for your order with{" "}
          <strong>McDonald's (Marine Drive)</strong>!
        </p>
        <p className="receipt-modal-info">
          <strong>Order Time</strong>: {props.order.time}
        </p>
        <p className="receipt-modal-info">
          <strong>Order Total</strong>: 3 items for{" "}
          <strong>100.00 {props.order.currency}</strong>
        </p>
        <HorizontalSeparator verticallySpaced />
        <table className="receipt-modal-items">
          <tbody>
            {props.order.content &&
              props.order.content.map((item, index) => (
                <tr key={`row-${index}`}>
                  <td className="receipt-modal-item-amount">
                    <span>{item.amount}</span>
                  </td>
                  <td className="receipt-modal-item-name">
                    <span>{item.name}</span>
                  </td>
                  <td className="receipt-modal-item-price">
                    <span>{`${(item.unitPrice * item.amount).toFixed(2)} ${
                      props.order?.currency
                    }`}</span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <HorizontalSeparator verticallySpaced />
        <table className="receipt-modal-prices">
          <tbody>
            <tr>
              <td>Subtotal</td>
              <td>100.00 {props.order.currency}</td>
            </tr>
            <tr>
              <td>Extra Charge</td>
              <td>
                {props.order.extraCharge.toFixed(2)} {props.order.currency}
              </td>
            </tr>
            <tr>
              <td>Delivery Fee</td>
              <td>
                {props.order.deliveryFee.toFixed(2)} {props.order.currency}
              </td>
            </tr>
            <tr>
              <td>Tip</td>
              <td>
                {props.order.tip.toFixed(2)} {props.order.currency}
              </td>
            </tr>
          </tbody>
        </table>
        <HorizontalSeparator verticallySpaced />
        <table className="receipt-modal-total">
          <tbody>
            <tr>
              <td>Total</td>
              <td>190.00 {props.order.currency}</td>
            </tr>
          </tbody>
        </table>
      </Modal.Body>
    </Modal>
  );
};

export default ReceiptModal;
