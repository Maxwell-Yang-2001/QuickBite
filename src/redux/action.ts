export type Dispatch = (_: any) => void;

export const setUser = (user: string) => (dispatch: Dispatch) => {
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
