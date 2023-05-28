import React, { useState } from "react";
import {
  CartEmpty,
  CartFilled,
  PersonEmpty,
  PersonFilled,
  Search,
  XCircle,
  Logo as LogoIcon,
} from "../../assets";
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
        <LogoIcon />
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
      <Search />
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
      <XCircle
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
        {props.user ? <PersonFilled /> : <PersonEmpty />}
        {props.user ?? "Log In / Sign up"}
      </QuickBgButton>
    </div>
  );
});

const CartButton = (props: { empty: boolean }) => {
  return (
    <QuickBgButton colored={false}>
      {props.empty ? <CartEmpty /> : <CartFilled />}
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
