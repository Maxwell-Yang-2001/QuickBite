import { defaultState } from "./state";

export default function reducer(state = defaultState, action: any) {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload.user,
      };
    case "SET_CURRENT_ITEM":
      return {
        ...state,
        currentItem: action.payload.currentItem,
      };
    case "ADD_TO_CART":
      const newCart = { ...state.cart };
      if (state.currentItem) {
        if (state.currentItem in state.cart) {
          newCart[state.currentItem] += action.payload.quantity;
        } else {
          newCart[state.currentItem] = action.payload.quantity;
        }
      }
      return {
        ...state,
        cart: newCart,
      };
    case "TOGGLE_CART_OFFCANVAS":
      return {
        ...state,
        cartOffcanvasOpen: !state.cartOffcanvasOpen,
      };
    default:
      return state;
  }
}
