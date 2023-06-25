import React, { useEffect } from "react";
import { PAGE } from "../../utils/constants";
import TopNavigator from "../topNavigator";
import { State, User } from "../../redux/state";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

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

  useEffect(() => {
    if (!props.user) {
      navigate("/account");
    }
  }, []);
  return <TopNavigator page={PAGE.Account} />;
});
