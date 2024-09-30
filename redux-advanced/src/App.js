import { useDispatch, useSelector } from "react-redux";
import { Fragment, useEffect } from "react";

import Cart from "./components/Cart/Cart";
import Notification from "./components/UI/Notification";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { sendCartData, fetchCartData } from "./store/cart-actions";

let isInitial = true;

function App() {
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const notification = useSelector((state) => state.ui.notification);
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCartData());
  }, []);

  // sending cart data
  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    if (!cart.changed) return;

    dispatch(sendCartData(cart));
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;

// alternativly :
// useEffect(() => {
//   const sendCartData = async () => {
//     dispatch(
//       uiActions.showNotification({
//         status: "pending",
//         title: "Sedning...",
//         message: "Sending cart data ",
//       })
//     );

//     const response = await fetch(
//       "https://react-dummy-9a37d-default-rtdb.firebaseio.com/cart.json",
//       {
//         method: "PUT",
//         body: JSON.stringify(cart),
//       }
//     );

//     if (!response.ok) {
//       throw new Error("Sending cart data failed");
//     }

//     dispatch(
//       uiActions.showNotification({
//         status: "success",
//         title: "Success!",
//         message: "Sending cart data ",
//       })
//     );
//   };

//   if (isInitial) {
//     isInitial = false;
//     return;
//   }

//   sendCartData().catch((error) => {
//     dispatch(
//       uiActions.showNotification({
//         status: "error",
//         title: "Error!",
//         message: "Sending cart data failed !",
//       })
//     );
//   });
// }, [cart, dispatch]);
