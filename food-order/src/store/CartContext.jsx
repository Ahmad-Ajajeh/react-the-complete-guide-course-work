import { createContext, useReducer } from "react";

// an object that has a provider property .
// this provider should be wrap the components that
// should use this context .
// so initializing the provider first needs this to be defined .
// also using the context provider from the wrapped components
// uses this object inside the useContext hook  so it also must be exported .
const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
});

function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    // state.item.push is not good because it mutates the state
    // so edit it before re-executing the component .

    const exisitingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    // updating the state in an immutable way .
    // here is the correct way , creating a new array object in memory .

    const updatedItems = [...state.items];

    if (exisitingCartItemIndex > -1) {
      const existingItem = state.items[exisitingCartItemIndex];
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      updatedItems[exisitingCartItemIndex] = updatedItem;
    } else {
      updatedItems.push({
        ...action.item,
        quantity: 1,
      });
    }

    return {
      ...state,
      items: updatedItems,
    };
  }

  if (action.type === "REMOVE_ITEM") {
    const exisitingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );

    const exisitingCartItem = state.items[exisitingCartItemIndex];

    const updatedItems = [...state.items];

    if (exisitingCartItem.quantity === 1) {
      updatedItems.splice(exisitingCartItemIndex, 1);
    } else {
      const updatedItem = {
        ...exisitingCartItem,
        quantity: exisitingCartItem.quantity - 1,
      };
      updatedItems[exisitingCartItemIndex] = updatedItem;
    }

    return { ...state, items: updatedItems };
  }

  if (action.type === "CLEAR_CART") {
    return { ...state, items: [] };
  }

  return state;
}

export function CartContextProvider({ children }) {
  // useReducer hook takes
  // 1. the reducer function used to edit the state .
  // this function recieves two params : state , action
  // you must return the state edit according to the action .
  // 2. the initial format of the state .
  // useReducer is managing the state inside this context, so its more advanced useState .
  // while the createContext is the API for outside .
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

  function addItem(item) {
    dispatchCartAction({ type: "ADD_ITEM", item });
  }
  function removeItem(id) {
    dispatchCartAction({ type: "REMOVE_ITEM", id });
  }

  function clearCart() {
    dispatchCartAction({ type: "CLEAR_CART" });
  }

  // here is the interface of the context that can
  // be used from wrapped componentes .
  const cartContext = {
    items: cart.items,
    addItem,
    removeItem,
    clearCart,
  };

  console.log(cartContext);

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}

export default CartContext;
