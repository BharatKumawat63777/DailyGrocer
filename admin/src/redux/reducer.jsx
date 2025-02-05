// reducer.js
import { SET_ORDERS, ADD_ORDER, REMOVE_ORDER } from "./action";

const initialState = {
  orders: [],
};

const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDERS:
      return { ...state, orders: action.payload };
    case ADD_ORDER:
      return { ...state, orders: [...state.orders, action.payload] };
    case REMOVE_ORDER:
      return {
        ...state,
        orders: state.orders.filter((order) => order.id !== action.payload),
      };
    default:
      return state;
  }
};

export default ordersReducer;
