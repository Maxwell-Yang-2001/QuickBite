import React, { useEffect, useState } from "react";
import { PAGE } from "../../utils/constants";
import TopNavigator from "../topNavigator";
import { Order, State, User } from "../../redux/state";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./past-orders-page.css";
import mcdonalds from "../../assets/mcdonalds.jpeg";
import { Button, Col, Row } from "react-bootstrap";
import { QuickBgButton } from "../commons";
import { DoorOpen, Receipt, Star } from "../../assets";
import ReceiptModal from "./receipt-modal";

const mapStateToProps = (state: State) => ({
  user: state.user,
});

type PastOrdersPageProps = {
  user?: User;
};

export const PastOrdersPage = connect(
  mapStateToProps,
  undefined
)((props: PastOrdersPageProps) => {
  const navigate = useNavigate();
  const [receiptOrder, setReceiptOrder] = useState<Order | undefined>(
    undefined
  );

  useEffect(() => {
    if (!props.user) {
      navigate("/account");
    }
  }, []);

  return (
    <>
      <TopNavigator page={PAGE.PastOrders} />
      <div className="page-container past-orders-page-container">
        <ReceiptModal order={receiptOrder} setOrder={setReceiptOrder} />
        <div className="past-orders-page-title">
          <span>Past Orders</span>
        </div>
        <div className="past-orders-page-content">
          {props.user?.pastOrders ? (
            props.user.pastOrders.map((order, index) => (
              <React.Fragment key={`entry-${index}`}>
                <div className="past-orders-page-entry d-flex align-items-top">
                  <img src={mcdonalds} alt="store" />
                  <div>
                    <Link to="/store" className="invisible-link">
                      <p className="past-orders-page-entry-store">
                        McDonald's (Marine Drive)
                      </p>
                    </Link>
                    <p className="past-orders-page-entry-time">{order.time}</p>
                    <p className="past-orders-page-entry-summary">
                      3 items for 100.00 USD
                    </p>
                  </div>
                  <div className="past-orders-page-entry-buttons">
                    <Button
                      className="quick-bite-button quick-bite-bg"
                      onClick={() => setReceiptOrder(order)}
                    >
                      <Receipt /> <span>View Receipt</span>
                    </Button>
                    <Link to="/store" className="invisible-link">
                      <Button className="quick-bite-button quick-bite-bg">
                        <DoorOpen /> <span>View Store</span>
                      </Button>
                    </Link>
                    {/* <Button className="quick-bite-button quick-bite-bg">
                      <Star /> <span>Rate Your Order</span>
                    </Button> */}
                  </div>
                </div>
              </React.Fragment>
            ))
          ) : (
            <span>No past orders found. Feel free to look around!</span>
          )}
        </div>
      </div>
    </>
  );
});
