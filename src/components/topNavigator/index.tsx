import React, { useEffect, useState } from "react";
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
import { Dispatch, toggleCartOffcanvas } from "../../redux/action";
import { Link } from "react-router-dom";
import { PAGE } from "../../utils/constants";
import CartOffcanvas from "../cartOffcanvas";
import { User } from "../../redux/state";

const Logo = () => {
  return (
    <div className="col">
      <Link to="/" className="top-navigator-logo invisible-link">
        <LogoIcon />
        <span>QuickBite</span>
      </Link>
    </div>
  );
};

const SearchBar = (props: { page: PAGE }) => {
  const [content, setContent] = useState("");
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    setContent("");
  }, [props.page]);

  return (
    <div
      className={`top-navigator-search d-flex align-items-center${
        content ? "" : " empty"
      } ${focused ? " focused" : ""}`}
    >
      <Search
        className={`clickable themed-content${content ? "" : " disabled"}`}
      />
      <input
        type="text"
        placeholder={
          props.page === PAGE.Home ? "Search for Stores" : "Search for Items"
        }
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
        className="clickable themed-content"
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
      className="top-navigator-dropdown"
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

const PriceDropdown = () => {
  const [priceRangeIndex, setPriceRangeIndex] = useState(0);
  const priceRanges = [
    "Any Price",
    "Below $5",
    "$5 - 9.99",
    "$10 - 14.99",
    "$15 - 19.99",
    "$20 - 24.99",
    "Above $25",
  ];

  return (
    <DropdownButton
      as={ButtonGroup}
      drop={"down-centered"}
      title={priceRanges[priceRangeIndex]}
      className="top-navigator-dropdown"
      variant="light"
    >
      <Dropdown.ItemText>Price Ranges</Dropdown.ItemText>
      <Dropdown.Divider />
      {priceRanges.map((priceRange, index) => (
        <Dropdown.Item
          key={`item-${index}`}
          onClick={(_) => setPriceRangeIndex(index)}
        >
          <span>{priceRange}</span>
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
};

const PersonButton = (props: { user?: User }) => {
  return (
    <div className="top-navigator-user">
      <Link to="/account" className="invisible-link">
        <QuickBgButton colored={false} className="clickable themed-content">
          {props.user ? <PersonFilled /> : <PersonEmpty />}
          {props.user ? `Hi, ${props.user.firstName}` : "Log In / Sign up"}
        </QuickBgButton>
      </Link>
    </div>
  );
};

const CartButton = (props: { empty: boolean; toggle: () => void }) => {
  return (
    <QuickBgButton
      colored={false}
      onClick={props.toggle}
      className="clickable themed-content"
    >
      {props.empty ? <CartEmpty /> : <CartFilled />}
    </QuickBgButton>
  );
};

const mapStateToProps = (state: {
  user?: User;
  cart: { [itemId: string]: number };
}) => ({
  user: state.user,
  cart: state.cart,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  toggleCartOffcanvas: () => dispatch(toggleCartOffcanvas()),
});

const TopNavigator = (props: {
  page: PAGE;
  user?: User;
  cart: { [itemId: string]: number };
  toggleCartOffcanvas: () => void;
}) => {
  return (
    <>
      <div className="top-navigator d-flex align-items-center">
        <Logo />
        {props.page !== PAGE.Account && (
          <>
            <SearchBar page={props.page} />
            {props.page === PAGE.Home ? <RatingDropdown /> : <PriceDropdown />}
            <PersonButton {...props} />
          </>
        )}
        <CartButton
          empty={Object.keys(props.cart).length === 0}
          toggle={props.toggleCartOffcanvas}
        />
      </div>
      <HorizontalSeparator verticallySpaced={false} />
      <CartOffcanvas />
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TopNavigator);
