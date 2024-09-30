import { createContext, useState } from "react";

export const ProductsContext = createContext({
  products: [],
  toggleFav: (id) => {},
});

export default (props) => {
  const [productsList, setProductsList] = useState([
    {
      id: "p1",
      title: "Red Scarf",
      description: "A pretty red scarf.",
      isFavorite: false,
    },
    {
      id: "p2",
      title: "Blue T-Shirt",
      description: "A pretty blue t-shirt.",
      isFavorite: false,
    },
    {
      id: "p3",
      title: "Green Trousers",
      description: "A pair of lightly green trousers.",
      isFavorite: false,
    },
    {
      id: "p4",
      title: "Orange Hat",
      description: "Street style! An orange hat.",
      isFavorite: false,
    },
  ]);

  function toggleFavorite(id) {
    setProductsList((currentProductsList) => {
      const prodIndex = currentProductsList.findIndex((p) => p.id === id);
      const newFavStatus = !currentProductsList[prodIndex].isFavorite;
      const updatedProducts = [...currentProductsList];
      updatedProducts[prodIndex] = {
        ...currentProductsList[prodIndex],
        isFavorite: newFavStatus,
      };
      return updatedProducts;
    });
  }

  const ctxValue = {
    products: productsList,
    toggleFav: toggleFavorite,
  };

  return (
    <ProductsContext.Provider value={ctxValue}>
      {props.children}
    </ProductsContext.Provider>
  );
};
