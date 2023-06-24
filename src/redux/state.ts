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
  pastOrders?: Order[];
};

export type OrderItem = {
  name: string;
  unitPrice: number;
  amount: number;
  image: string;
};

export type Currency = "USD" | "CAD";

export type OrderStatus = "DELIVERED" | "CANCELLED" | "REFUNDED";

export type Order = {
  id: string;
  customerId: string;
  storeId: string;
  content?: OrderItem[];
  extraCharge: number;
  tip: number;
  currency: string;
  time: string;
  driverId: string;
  status: OrderStatus;
  storeRating?: number;
  driverRating?: number;
};

export type State = {
  user?: User;
  currentItem?: string;
  cart: { [itemId: string]: number };
  cartOffcanvasOpen: boolean;
};

const defaultOrderItem: OrderItem = {
  name: "Big-mac",
  unitPrice: 199.99,
  amount: 2,
  image: "dummy-image",
};

const defaultOrder: Order = {
  id: "orderId",
  customerId: "thomas_song",
  storeId: "mcdonalds_marine_drive",
  content: [
    defaultOrderItem,
    defaultOrderItem,
    defaultOrderItem,
    defaultOrderItem,
  ],
  extraCharge: 30,
  tip: 40,
  currency: "CAD",
  time: "2:05 p.m. PDT, July 2nd, 2021",
  driverId: "maxwell_yang",
  status: "DELIVERED",
  storeRating: 5,
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
  },
  pastOrders: [defaultOrder, defaultOrder, defaultOrder, defaultOrder],
};

export const defaultState: State = {
  user: defaultUser,
  // user: undefined,
  currentItem: undefined,
  cart: {},
  cartOffcanvasOpen: false,
};
