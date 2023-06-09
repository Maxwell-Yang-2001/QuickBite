import { connect } from "react-redux";
import { Dispatch, setCurrentItem } from "../../redux/action";
import { State, User } from "../../redux/state";
import "./account-page.css";
import TopNavigator from "../topNavigator";
import { PAGE } from "../../utils/constants";
import { LoginPage } from "./login-page";
import { ProfilePage } from "./profile-page";

const mapStateToProps = (state: State) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setCurrentItem: (currentItem: string) =>
    dispatch(setCurrentItem(currentItem)),
});

export const AccountPage = connect(
  mapStateToProps,
  mapDispatchToProps
)((props: { user?: User }) =>
  props.user ? (
    <>
      <TopNavigator page={PAGE.Account} />
      <ProfilePage />
    </>
  ) : (
    <LoginPage />
  )
);
