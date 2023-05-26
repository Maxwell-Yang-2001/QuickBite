import { defaultState } from "./state";

export default function reducer(state = defaultState, action: any) {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
