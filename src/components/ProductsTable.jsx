import { Table, Space, Button } from "antd";

const ProductTable = ({ products, isCompared, handleCompare }) => {
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
    { title: "Description", dataIndex: "description", key: "description", ellipsis: true },
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

  return <Table columns={columns} dataSource={products} rowKey="id" pagination={{ position: ["bottomCenter"] }} />;
};

export default ProductTable;
