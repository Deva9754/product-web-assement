import { useState, useEffect } from "react";
import { Table, Button, Modal } from "antd";
import { useNavigate } from "react-router-dom";

function CompareProducts({ compareList = [], setCompareList, allProducts }) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [availableProducts, setAvailableProducts] = useState([]);

  useEffect(() => {
    const filteredProducts = allProducts.filter(
      (product) => !compareList.some((comp) => comp.id === product.id)
    );
    setAvailableProducts(filteredProducts);
  }, [allProducts, compareList]);

  const removeFromCompare = (id) => {
    setCompareList(compareList.filter((product) => product.id !== id));
  };

  const addToCompare = (product) => {
    if (compareList.length < 4) setCompareList([...compareList, product]);
  };

  const columns = [
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Brand", dataIndex: "brand", key: "brand" },
    { title: "Category", dataIndex: "category", key: "category" },
    { title: "Price ($)", dataIndex: "price", key: "price" },
    { title: "Discount (%)", dataIndex: "discountPercentage", key: "discountPercentage" },
    {
      title: "Image",
      dataIndex: "thumbnail",
      key: "thumbnail",
      render: (url) => <img src={url} alt="Product" className="w-12 h-12 rounded-md" />,
    },
    {
      title: "Remove",
      key: "remove",
      render: (_, record) => (
        <Button type="danger" onClick={() => removeFromCompare(record.id)}>
          Remove
        </Button>
      ),
    },
  ];

  const modalColumns = [
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Brand", dataIndex: "brand", key: "brand" },
    { title: "Category", dataIndex: "category", key: "category" },
    { title: "Price ($)", dataIndex: "price", key: "price" },
    {
      title: "Image",
      dataIndex: "thumbnail",
      key: "thumbnail",
      render: (url) => <img src={url} alt="Product" className="w-12 h-12 rounded-md" />,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button type="primary" disabled={compareList.length >= 4} onClick={() => addToCompare(record)}>
          Add to Compare
        </Button>
      ),
    },
  ];

  return (
    <div className="relative">
      <h2 className="text-2xl font-semibold mb-4">Compare Products</h2>

      {compareList.length === 0 ? (
        <p>No products added for comparison.</p>
      ) : (
        <Table columns={columns} dataSource={compareList} rowKey="id" pagination={false} />
      )}

      <Button type="primary" className="mt-4" onClick={() => setIsModalOpen(true)} disabled={compareList.length >= 4}>
        Add More
      </Button>

      <Modal
        title="Add More Products"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        centered
        width={900}
        style={{ top: 50, zIndex: 1000 }}
        bodyStyle={{ overflow: "hidden" }}
      >
        {availableProducts.length > 0 ? (
          <Table
            columns={modalColumns}
            dataSource={availableProducts}
            rowKey="id"
            pagination={{ pageSize: 5, showSizeChanger: false, position: ["bottomCenter"] }}
          />
        ) : (
          <p>No more products available to add.</p>
        )}
      </Modal>
    </div>
  );
}

export default CompareProducts;