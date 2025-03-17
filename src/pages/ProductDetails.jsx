import { useEffect, useState } from "react";
import { Table, Space, Button, Pagination } from "antd";
import { CircularProgress, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

function ProductDetails({ allProducts, setAllProducts, compareList, setCompareList }) {
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

  // Function to check if product is in compare list
  const isCompared = (id) => compareList.some((item) => item.id === id);

  // Function to add product to compare
  const handleCompare = (product) => {
    if (!isCompared(product.id)) {
      if (compareList.length < 4) {
        setCompareList([...compareList, product]);
        navigate("/compare"); // Redirect to Compare Page
      } else {
        alert("You can only compare up to 4 products at a time!");
      }
    }
  };

  // Define table columns
  const columns = [
    { 
      title: "Title", 
      dataIndex: "title", 
      key: "title",
      render: (text, record) => (
        <span style={{ fontWeight: isCompared(record.id) ? "bold" : "normal", color: isCompared(record.id) ? "#1677FF" : "inherit" }}>
          {text}
        </span>
      )
    },
    { 
      title: "Description", 
      dataIndex: "description", 
      key: "description", 
      ellipsis: true 
    },
    { 
      title: "Price ($)", 
      dataIndex: "price", 
      key: "price", 
      sorter: (a, b) => a.price - b.price,
      render: (text, record) => (
        <span style={{ fontWeight: isCompared(record.id) ? "bold" : "normal", color: isCompared(record.id) ? "#1677FF" : "inherit" }}>
          ${text}
        </span>
      )
    },
    { 
      title: "Discount (%)", 
      dataIndex: "discountPercentage", 
      key: "discountPercentage", 
      sorter: (a, b) => a.discountPercentage - b.discountPercentage,
      render: (text, record) => (
        <span style={{ fontWeight: isCompared(record.id) ? "bold" : "normal", color: isCompared(record.id) ? "#1677FF" : "inherit" }}>
          {text}%
        </span>
      )
    },
    { 
      title: "Brand", 
      dataIndex: "brand", 
      key: "brand",
      render: (text, record) => (
        <span style={{ fontWeight: isCompared(record.id) ? "bold" : "normal", color: isCompared(record.id) ? "#1677FF" : "inherit" }}>
          {text}
        </span>
      )
    },
    { 
      title: "Category", 
      dataIndex: "category", 
      key: "category",
      render: (text, record) => (
        <span style={{ fontWeight: isCompared(record.id) ? "bold" : "normal", color: isCompared(record.id) ? "#1677FF" : "inherit" }}>
          {text}
        </span>
      )
    },
    {
      title: "Image",
      dataIndex: "thumbnail",
      key: "thumbnail",
      render: (url) => <img src={url} alt="Product" style={{ width: "50px", borderRadius: "5px" }} />
    },
    {
      title: "Compare",
      key: "compare",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" disabled={isCompared(record.id)} onClick={() => handleCompare(record)}>
            {isCompared(record.id) ? "Added" : "Compare"}
          </Button>
        </Space>
      )
    }
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Product Details</h2>

      {/* Loader */}
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
          <CircularProgress color="primary" size={60} />
        </Box>
      ) : (
        <>
          {/* Product Table */}
          <Table
            columns={columns}
            dataSource={allProducts}
            rowKey="id"
            pagination={{ position: ["bottomCenter"] }}
          />
        </>
      )}
    </div>
  );
}

export default ProductDetails;
