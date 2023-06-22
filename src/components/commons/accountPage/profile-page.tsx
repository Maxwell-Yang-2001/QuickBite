import { connect } from "react-redux";
import { Dispatch, setCurrentItem } from "../../../redux/action";
import { State, User } from "../../../redux/state";
import { Button, Col, Form, Row, Toast, ToastContainer } from "react-bootstrap";
import { useState } from "react";
import { Edit, Save, X } from "../../../assets";
import { QuickBgButton, SnackBar } from "..";

const mapStateToProps = (state: State) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setCurrentItem: (currentItem: string) =>
    dispatch(setCurrentItem(currentItem)),
});

export const ProfilePage = connect(
  mapStateToProps,
  mapDispatchToProps
)((props: { user?: User }) => {
  if (!props.user) return <></>;

  const [editing, setEditing] = useState(false);
  const [firstName, setFirstName] = useState(props.user.firstName);
  const [lastName, setLastName] = useState(props.user.lastName);
  const [emailAddress, setEmailAddress] = useState(props.user.emailAddress);
  const [phoneNumber, setPhoneNumber] = useState(props.user.phoneNumber);
  const [showMessage, setShowMessage] = useState(false);

  return (
    <div className="page-container profile-page-container">
      <SnackBar show={showMessage} setShow={setShowMessage} type="success">
        Your basic information has been updated.
      </SnackBar>
      <div className="profile-page-title">
        <span>Profile</span>
      </div>
      <div className="profile-page-subtitle d-flex align-items-center">
        <span>Basic Information</span>
        <div className="profile-page-subtitle-button-group">
          {editing ? (
            <>
              <QuickBgButton
                colored={false}
                className="clickable themed-content"
                onClick={() => {
                  setEditing(false);
                  setShowMessage(true);
                }}
              >
                <Save />
              </QuickBgButton>
              <QuickBgButton
                colored={false}
                className="clickable themed-content"
                onClick={() => {
                  setEditing(false);
                }}
              >
                <X />
              </QuickBgButton>
            </>
          ) : (
            <QuickBgButton
              colored={false}
              className="clickable themed-content"
              onClick={() => {
                setEditing(true);
              }}
            >
              <Edit />
            </QuickBgButton>
          )}
        </div>
      </div>
      <Form className="profile-page-form d-flex">
        <Form.Group as={Row} className="mb-3 g-4">
          <Col sm={6}>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="John"
              value={firstName}
              disabled={!editing}
            />
          </Col>
          <Col sm={6}>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Doe"
              value={lastName}
              disabled={!editing}
            />
          </Col>
          <Col sm={6}>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="hello@gmail.com"
              value={emailAddress}
              disabled={!editing}
            />
          </Col>
          <Col sm={6}>
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="email"
              placeholder="123-456-7890"
              value={phoneNumber}
              disabled={!editing}
            />
          </Col>
          <Col sm={6}>
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="123 - 1234 First St"
              value={""}
              disabled={!editing}
            />
          </Col>
          <Col sm={2}>
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              placeholder="Vancouver"
              value={""}
              disabled={!editing}
            />
          </Col>
          <Col sm={2}>
            <Form.Label>Province</Form.Label>
            <Form.Control
              type="text"
              placeholder="BC"
              value={""}
              disabled={!editing}
            />
          </Col>
          <Col sm={2}>
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              type="text"
              placeholder="A1A 1A1"
              value={""}
              disabled={!editing}
            />
          </Col>
        </Form.Group>
      </Form>
      <div className="profile-page-subtitle">
        <span>Past Orders</span>
      </div>
    </div>
  );
});
