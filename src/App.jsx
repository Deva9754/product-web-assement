import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import ProductDetails from "./pages/ProductDetails";
import CompareProducts from "./pages/CompareProducts";
import { useState, useEffect } from "react";

function App() {
  const [allProducts, setAllProducts] = useState([]);
  const [compareList, setCompareList] = useState([]); // Ensure this exists

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => setAllProducts(data.products))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate replace to="/products" />} />
        <Route path="/" element={<Layout />}>
          <Route
            path="/products"
            element={<ProductDetails allProducts={allProducts} setAllProducts={setAllProducts} compareList={compareList} setCompareList={setCompareList} />}
          />
          <Route
            path="/compare"
            element={<CompareProducts allProducts={allProducts} compareList={compareList} setCompareList={setCompareList} />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
