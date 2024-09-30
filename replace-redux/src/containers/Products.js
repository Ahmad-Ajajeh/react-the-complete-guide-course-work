import React, { useContext } from "react";

import ProductItem from "../components/Products/ProductItem";
// import { ProductsContext } from "../context/products-context";
import { useStore } from "../hooks-store/store";
import "./Products.css";

const Products = (props) => {
  // const productsList = useContext(ProductsContext).products;
  const state = useStore(true)[0];

  return (
    <ul className="products-list">
      {state.products.map((prod) => (
        <ProductItem
          key={prod.id}
          id={prod.id}
          title={prod.title}
          description={prod.description}
          isFav={prod.isFavorite}
        />
      ))}
    </ul>
  );
};

export default Products;
