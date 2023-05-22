import React from "react";
import logo from "../assets/logo.svg";
import cart_empty from "../assets/cart_empty.svg";
import cart_filled from "../assets/cart_filled.svg";
import person_empty from "../assets/person_empty.svg";
import person_filled from "../assets/person_filled.svg";
import search from "../assets/search.svg";
import xCircle from "../assets/x-circle.svg";
import "./top-navigator.css";
import { Button, HorizontalSeparator } from "../utils/commons";

const Logo = () => {
  return (
    <div className="logo col">
      <img src={logo} alt={"QuickBite"} />
      <span>QuickBite</span>
    </div>
  );
};

const SearchBox = () => {
  return (
    <div className="top-navigator-search d-flex align-items-center">
    <img src={search} alt={"search icon"} />
    <input
      type="text"
      placeholder="Search for stores"
    />
    <img src={xCircle} alt="clear" />
    </div>
  );
};

const PersonButton = (props: { loggedIn: boolean }) => {
  return (
    <Button colored={false}>
      <img src={props.loggedIn ? person_filled : person_empty} alt={"cart"} />
      {!props.loggedIn && "Log In / Sign up"}
    </Button>
  );
};

const CartButton = (props: { empty: boolean }) => {
  return (
    <Button colored={false}>
      <img src={props.empty ? cart_empty : cart_filled} alt={"cart"} />
    </Button>
  );
};

const UserLogo = () => {};

export const TopNavigator = () => {
  return (
    <>
      <div className="top-navigator d-flex align-items-center">
        <Logo />
        <SearchBox />
        <PersonButton loggedIn={false} />
        <CartButton empty />
      </div>
      <HorizontalSeparator />
    </>
  );
};
