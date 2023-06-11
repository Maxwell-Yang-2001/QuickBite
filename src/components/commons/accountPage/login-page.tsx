import { Link, redirect, useNavigate } from "react-router-dom";
import { Logo } from "../../../assets";
import { Button, Form, Tab, Tabs } from "react-bootstrap";
import { State } from "../../../redux/state";
import { Dispatch, setUser } from "../../../redux/action";
import { connect } from "react-redux";

export const LoginWindow = (props: { setUser: (user: string) => void }) => {
  const navigate = useNavigate();

  return (
    <>
      <Form.Group className="mb-3" controlId="login.email">
        <Form.Label>Email address</Form.Label>
        <Form.Control size="lg" type="email" placeholder="name@example.com" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="login.password">
        <Form.Label>Password</Form.Label>
        <Form.Control size="lg" type="text" />
      </Form.Group>
      <Button
        className="quick-bite-button quick-bite-bg"
        onClick={() => {
          props.setUser("a");
          navigate("/");
        }}
      >
        Log In
      </Button>
    </>
  );
};

export const SignupWindow = () => (
  <>
    <Form.Group className="mb-3" controlId="signup.email">
      <Form.Label>Email address</Form.Label>
      <Form.Control size="lg" type="email" placeholder="name@example.com" />
    </Form.Group>
    <Form.Group className="mb-3" controlId="signup.password">
      <Form.Label>Password</Form.Label>
      <Form.Control size="lg" type="text" />
    </Form.Group>
    <Form.Group className="mb-3" controlId="signup.confirmPassword">
      <Form.Label>Confirm Password</Form.Label>
      <Form.Control size="lg" type="text" />
    </Form.Group>
    <Button className="quick-bite-button quick-bite-bg">Sign Up</Button>
  </>
);

const mapStateToProps = (state: State) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setUser: (user: string) => dispatch(setUser(user)),
});

export const LoginPage = connect(
  mapStateToProps,
  mapDispatchToProps
)((props: { user?: string; setUser: (user: string) => void }) => (
  <>
    <div className="login-page-ad-container d-flex align-items-center">
      <div className="login-page-ad-content-wrapper">
        <div className="login-page-logo d-flex align-items-center">
          <Logo />
          <Link to="/" className="invisible-link">
            <span>QuickBite</span>
          </Link>
        </div>
        <p>Fresh and delicious, right to your door!</p>
      </div>
    </div>
    <div className="login-page-login-container d-flex align-items-center">
      <div className="login-page-tabbed-wrapper">
        <Tabs
          defaultActiveKey="login"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="login" title="Log In">
            <LoginWindow setUser={props.setUser} />
          </Tab>
          <Tab eventKey="signup" title="Sign Up">
            <SignupWindow />
          </Tab>
        </Tabs>
      </div>
    </div>
  </>
));
