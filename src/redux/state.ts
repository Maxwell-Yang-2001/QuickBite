export type State = {
  user?: string;
  currentItem?: string;
  cart: { [itemId: string]: number };
  cartOffcanvasOpen: boolean;
};

export const defaultState: State = {
  user: undefined,
  currentItem: undefined,
  cart: {},
  cartOffcanvasOpen: false,
};
