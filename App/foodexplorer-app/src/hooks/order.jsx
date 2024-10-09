import React, { createContext, useContext, useCallback, useEffect, useReducer, useRef } from "react";

import { api } from "../services/api";

import { useAuth } from "./auth";

const OrderContext = createContext();

const initialState = {
  total_price: 0.0,
  payment_method: "",
  dishes: [],
  customerID: null,
  // dishes: [{id: 1, "qty": 3}, {"id": 2, "qty": 1}]
  // other relevant order details
};

const orderReducer = (state, action) => {
  switch (action.type) {
    case "SET_STATE":
      return { ...state, ...action.payload };
    case "ADD_ITEM":
      return {
        ...state,
        // add logic for: if an item is already in the list, then only increment the count
        // under the same id
        dishes: state.dishes.some((dish) => dish.id === action.payload.id)
          ? state.dishes.map((dish) =>
              dish.id === action.payload.id
                ? { ...dish, quantity: dish.quantity + action.payload.quantity }
                : dish
            )
          : [...state.dishes, action.payload],
        total_price:
          state.total_price + action.payload.price * action.payload.quantity,
        customerID: action.payload.customerID,
      };
    case "REMOVE_ITEM":
      return {
        ...state,
        dishes: state.dishes.filter((dish) => dish.id !== action.payload.id),
        total_price:
          state.total_price - action.payload.price * action.payload.quantity,
      };
    case "UPDATE_QUANTITY":
      return {
        ...state,
        dishes: state.dishes.map((dish) =>
          dish.id === action.payload.id
            ? { ...dish, qty: action.payload.quantity }
            : dish
        ),
        total_price: state.dishes.reduce(
          (acc, dish) => acc + dish.price * dish.quantity,
          0
        ),
      };
    case "SET_PAYMENT_METHOD":
      return {
        ...state,
        payment_method: action.payload,
      };
    case "SET_CUSTOMER_ID":
      return {
        ...state,
        customerID: action.payload,
      };
    default:
      return state;
  }
};

export const OrderProvider = ({ children }) => {
  const [state, dispatch] = useReducer(orderReducer, initialState);
  const { user } = useAuth();

  const addItem = (dish) => {
    dispatch({ type: "ADD_ITEM", payload: dish })
  };

  const removeItem = (dish) => {
    dispatch({ type: "REMOVE_ITEM", payload: dish });
  };

  const updateQuantity = (dish, quantity) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id: dish.id, quantity } });
  };

  const setPaymentMethod = (payment_method) => {
    dispatch({ type: "SET_PAYMENT_METHOD", payload: payment_method });
  };

  const setCustomerID = (customerID) => {
    dispatch({ type: "SET_CUSTOMER_ID", payload: customerID });
  };

  const getItemsSum = () => {
    // get the quantity of diferent dishes for the current user
    const count = state.dishes.length || 0;
    return count;
  };

  const getOrder = () => {
    // filter orders by the logged in user
    // const orders = await api.get(`/orders?user_id=${user.id}`);
    // return orders.data;

    // for demonstration purposes, we'll just return a hardcoded order
    return {
      total_price: 120.0,
      payment_method: "credit_card",
      dishes: [
        { id: 1, quantity: 2 },
        { id: 2, quantity: 1 },
      ],
      customerID: user.id,
    };

    // return state;
  };

  // console.log(state);
  
  const updateState = useCallback((newState) => {
    dispatch({ type: "SET_STATE", payload: newState });
  }, []);
  
  const updateLocalStorage = useCallback(() => {
    localStorage.setItem("@foodex:order", JSON.stringify(state));
  }, [state]);
  
  const clearOrder = useCallback(() => {
    console.log("clearing order");
    localStorage.removeItem("@foodex:order");
    dispatch({ type: "SET_STATE", payload: initialState });
  }, []);
  
  useEffect(() => {
    const retrieveLocalStorage = async () => {
      if (state.dishes.length === 0) {
        updateState(order);
      } else {
        updateLocalStorage();
      }
    };
    retrieveLocalStorage();
  }, [state, updateLocalStorage, updateState]);

  useEffect(() => {
    const order = JSON.parse(localStorage.getItem("@foodex:order"));
    
    let customerID = order ? order.customerID : undefined;
    
    const retrieveLocalStorage = async () => {
      if (state.dishes.length === 0 && order) {
        updateState(order);
      } 
      // else {
      //   updateLocalStorage();
      // }
    };
    // if the user is not logged in, clear the order
    // if (user.id === undefined) {
      //   clearOrder();
      //   return;
      // }
      
      // if the user is logged in, but the order is not for the logged in user, clear the order
    if (customerID !== undefined && customerID !== user.id) {
      clearOrder();     
    } else {
      retrieveLocalStorage();
    }

  }, [user.id, updateState, updateLocalStorage, clearOrder]);

  return (
    <OrderContext.Provider
      value={{
        state,
        addItem,
        removeItem,
        updateQuantity,
        setPaymentMethod,
        setCustomerID,
        getItemsSum,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrder must be used within an OrderProvider");
  }
  return context;
};
