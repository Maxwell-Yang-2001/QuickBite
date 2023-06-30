import { User } from "./state";

export type Dispatch = (_: any) => void;

export const setUser = (user: User) => (dispatch: Dispatch) => {
  dispatch({
    type: "SET_USER",
    payload: {
      user,
    },
  });
};

export const setCurrentItem =
  (currentItem?: string) => (dispatch: Dispatch) => {
    dispatch({
      type: "SET_CURRENT_ITEM",
      payload: {
        currentItem,
      },
    });
  };

export const addToCart = (quantity: number) => (dispatch: Dispatch) => {
  dispatch({
    type: "ADD_TO_CART",
    payload: {
      quantity,
    },
  });
};

export const removeFromCart = (itemId: string) => (dispatch: Dispatch) => {
  dispatch({
    type: "REMOVE_FROM_CART",
    payload: {
      itemId,
    },
  });
};


export const toggleCartOffcanvas = () => (dispatch: Dispatch) => {
  dispatch({
    type: "TOGGLE_CART_OFFCANVAS",
    payload: {},
  });
};
