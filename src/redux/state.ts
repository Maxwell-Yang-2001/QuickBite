type State = {
  user?: string;
  currentItem?: string;
  cart: {[itemId: string]: number};
};

export const defaultState: State = {
  user: undefined,
  currentItem: undefined,
  cart: {},
};
