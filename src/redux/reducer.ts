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
    default:
      return state;
  }
}
