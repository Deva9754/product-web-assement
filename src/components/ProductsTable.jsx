import { Table, Space, Button } from "antd";
import { useState, useEffect } from "react";

const ProductTable = ({ products, isCompared, handleCompare }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const columns = [
    { 
      title: "Title", 
      dataIndex: "title", 
      key: "title",
      render: (text, record) => (
        <span 
          style={{ 
            fontWeight: isCompared(record.id) ? "bold" : "normal", 
            color: isCompared(record.id) ? "#1677FF" : "inherit" 
          }}
        >
          {text}
        </span>
      )
    },
    ...(windowWidth > 768 ? [
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
      },
      { 
        title: "Category", 
        dataIndex: "category", 
        key: "category",
      },
      {
        title: "Image",
        dataIndex: "thumbnail",
        key: "thumbnail",
        render: (url) => <img src={url} alt="Product" className="w-12 h-12 rounded-md" />
      }
    ] : []),
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
    <Table 
      columns={columns} 
      dataSource={products} 
      rowKey="id" 
      pagination={{ position: ["bottomCenter"] }} 
      className="bg-gray-800 text-white shadow-lg rounded-lg overflow-hidden"
    />
  );
};

export default ProductTable;
