export type Address = {
  firstLine: string;
  city: string;
  province: string;
  postalCode: string;
};

export type User = {
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: string;
  address: Address;
};

export type State = {
  user?: User;
  currentItem?: string;
  cart: { [itemId: string]: number };
  cartOffcanvasOpen: boolean;
};

export const defaultUser: User = {
  firstName: "Thomas",
  lastName: "Song",
  emailAddress: "testcctv@gmail.com",
  phoneNumber: "123-123-1234",
  address: {
    firstLine: "123-1234 Dummy St",
    city: "Vancouver",
    province: "BC",
    postalCode: "V1V 1V1",
  }
};

export const defaultState: State = {
  user: defaultUser,
  // user: undefined,
  currentItem: undefined,
  cart: {},
  cartOffcanvasOpen: false,
};
