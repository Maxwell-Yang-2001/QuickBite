import React, { useState } from "react";
import logo from "../../assets/logo.svg";
import cart_empty from "../../assets/cart_empty.svg";
import cart_filled from "../../assets/cart_filled.svg";
import person_empty from "../../assets/person_empty.svg";
import person_filled from "../../assets/person_filled.svg";
import search from "../../assets/search.svg";
import xCircle from "../../assets/x-circle.svg";
import "./top-navigator.css";
import { QuickBgButton, HorizontalSeparator, Star } from "../commons";
import { ButtonGroup, Dropdown, DropdownButton } from "react-bootstrap";
import { connect } from "react-redux";
import { Dispatch, setUser } from "../../redux/action";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div className="col">
      <Link to="/" className="logo invisible-link">
        <img src={logo} alt={"QuickBite"} />
        <span>QuickBite</span>
      </Link>
    </div>
  );
};

const SearchBar = () => {
  const [content, setContent] = useState("");
  const [focused, setFocused] = useState(false);

  return (
    <div
      className={`top-navigator-search d-flex align-items-center${
        content ? "" : " empty"
      } ${focused ? " focused" : ""}`}
    >
      <img src={search} alt={"search icon"} />
      <input
        type="text"
        placeholder="Search for stores"
        onChange={(e) => {
          e.preventDefault();
          setContent(e.target.value);
        }}
        onFocus={(e) => {
          e.preventDefault();
          setFocused(true);
        }}
        onBlur={(e) => {
          e.preventDefault();
          setFocused(false);
        }}
        value={content}
      />
      <img
        src={xCircle}
        alt="clear"
        onClick={(e) => {
          e.preventDefault();
          if (content) {
            setContent("");
          }
        }}
      />
    </div>
  );
};

const RatingDropdown = () => {
  const [minStar, setMinStar] = useState(4);
  const starThresholds = [5, 4.5, 4, 3.5, 3, 2.5, 2, 1.5, 1];

  return (
    <DropdownButton
      as={ButtonGroup}
      drop={"down-centered"}
      title={<Star star={minStar} />}
      className="quick-bite-rating-dropdown"
      variant="light"
    >
      <Dropdown.ItemText>Minimum ratings</Dropdown.ItemText>
      <Dropdown.Divider />
      {starThresholds.map((starThreshold) => (
        <Dropdown.Item
          key={`star-${starThreshold}`}
          onClick={(_) => setMinStar(starThreshold)}
        >
          <Star star={starThreshold} />
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
};

const mapStateToPersonButtonProps = (state: { user: string }) => ({
  user: state.user,
});

const mapDispatchToPersonButtonProps = (dispatch: Dispatch) => ({
  setUser: (user: string) => dispatch(setUser(user)),
});

const PersonButton = connect(
  mapStateToPersonButtonProps,
  mapDispatchToPersonButtonProps
)((props: { user: string; setUser: (user: string) => void }) => {
  return (
    <div className="top-navigator-user">
      <QuickBgButton
        colored={false}
        onClick={() => {
          props.setUser("a");
        }}
      >
        <img src={props.user ? person_filled : person_empty} alt={"cart"} />
        {props.user ?? "Log In / Sign up"}
      </QuickBgButton>
    </div>
  );
});

const CartButton = (props: { empty: boolean }) => {
  return (
    <QuickBgButton colored={false}>
      <img src={props.empty ? cart_empty : cart_filled} alt={"cart"} />
    </QuickBgButton>
  );
};

export const TopNavigator = () => {
  return (
    <>
      <div className="top-navigator d-flex align-items-center">
        <Logo />
        <SearchBar />
        <RatingDropdown />
        <PersonButton />
        <CartButton empty />
      </div>
      <HorizontalSeparator verticallySpaced={false} />
    </>
  );
};
