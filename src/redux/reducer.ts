import { defaultState } from "./state";

export default function reducer(state = defaultState, action: any) {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload.user
      };
    case "SET_CURRENT_ITEM":
      return {
        ...state,
        currentItem: action.payload.currentItem
      };
    case "ADD_TO_CART":
      if (state.currentItem) {
        if (state.currentItem in state.cart) {
          state.cart[state.currentItem] += action.payload.quantity;
        } else {
          state.cart[state.currentItem] = action.payload.quantity;
        }
      }
      return state;
    default:
      return state;
  }
}
