import { useContext } from "react";

import CartContext from "../store/CartContext.jsx";
import Button from "./UI/Button.jsx";

import logoImg from "../assets/logo.jpg";
import UserProgressContext from "../store/UserProgressContext.jsx";

export default function Header() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  // the reduce takes two args
  // the first is a function with two params
  // 1 . the accumulator , and the navigator
  // the second is the initial value of acc.
  const totalCartItems = cartCtx.items.reduce((totalNumberOfItem, item) => {
    return totalNumberOfItem + item.quantity;
  }, 0);

  function handleShowCart() {
    userProgressCtx.showCart();
  }

  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="A restaurant" />
        <h1>React Food</h1>
      </div>
      <nav>
        <Button onClick={handleShowCart} textOnly>
          Cart ({totalCartItems})
        </Button>
      </nav>
    </header>
  );
}
