import { Link } from "react-router-dom";

const PRODUCTS = [
  { id: "p1", title: "product one" },
  { id: "p2", title: "product two" },
  { id: "p3", title: "product three" },
];

function ProductsPage() {
  return (
    <>
      <h1>Products Page</h1>
      <ul>
        {PRODUCTS.map((prod) => (
          <li key={prod.id}>
            <Link to={`{prod.id}`}>{prod.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default ProductsPage;
