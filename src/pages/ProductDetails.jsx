import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductTable from "../components/ProductsTable.jsx";
import Loader from "../components/Loader.jsx";

const ProductDetails = ({ allProducts, setAllProducts, compareList, setCompareList })=> {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data.products);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, [setAllProducts]);

  // Check if product is in compare list
  const isCompared = (id) => compareList.some((item) => item.id === id);

  // Add product to compare
  const handleCompare = (product) => {
    if (!isCompared(product.id)) {
      if (compareList.length < 4) {
        setCompareList([...compareList, product]);
        navigate("/compare");
      } else {
        alert("You can only compare up to 4 products at a time!");
      }
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Product Details</h2>

      {loading ? <Loader /> : <ProductTable products={allProducts} isCompared={isCompared} handleCompare={handleCompare} />}
    </div>
  );
}

export default ProductDetails;
