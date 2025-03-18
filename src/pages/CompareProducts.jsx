



import { useState, useEffect } from "react";
import { Table, Button, Modal } from "antd";

const CompareProducts = ({ compareList = [], setCompareList, allProducts }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [availableProducts, setAvailableProducts] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  return (
    <div className="bg-gray-900 text-white p-4 rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Compare Products</h2>

      {compareList.length === 0 ? (
        <p>No products added for comparison.</p>
      ) : isMobile ? (
        <div className="space-y-4">
          {compareList.map((product) => (
            <div key={product.id} className="bg-gray-800 text-white p-4 rounded-lg shadow-lg">
              <div className="flex items-center space-x-4">
                <img src={product.thumbnail} alt="Product" className="w-20 h-20 object-cover rounded-md" />
                <div>
                  <h3 className="text-lg font-semibold text-blue-400">{product.title}</h3>
                  <p className="text-gray-400 text-sm">Brand: {product.brand}</p>
                  <p className="text-yellow-400">Category: {product.category}</p>
                  <p className="text-white font-bold">Price: ${product.price}</p>
                  <p className="text-green-400">Discount: {product.discountPercentage}%</p>
                  <Button type="danger" className="mt-2" onClick={() => removeFromCompare(product.id)}>
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
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
        width={isMobile ? "90%" : 900}
        style={{ top: 50, zIndex: 1000 }}
        bodyStyle={{ overflow: "auto", maxHeight: "80vh", padding: isMobile ? "10px" : "20px" }}
      >
        {availableProducts.length > 0 ? (
          isMobile ? (
            <div className="grid grid-cols-1 gap-4">
              {availableProducts.map((product) => (
                <div key={product.id} className="bg-gray-800 text-white p-4 rounded-lg shadow-md">
                  <div className="flex items-center space-x-4">
                    <img src={product.thumbnail} alt="Product" className="w-16 h-16 object-cover rounded-md" />
                    <div>
                      <h3 className="text-md font-semibold text-blue-400">{product.title}</h3>
                      <p className="text-gray-400 text-sm">Brand: {product.brand}</p>
                      <p className="text-yellow-400">Category: {product.category}</p>
                      <p className="text-white font-bold">Price: ${product.price}</p>
                      <Button
                        type="primary"
                        className="mt-2"
                        disabled={compareList.length >= 4}
                        onClick={() => addToCompare(product)}
                      >
                        Add to Compare
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <Table
              columns={[
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
                    <Button
                      type="primary"
                      disabled={compareList.length >= 4}
                      onClick={() => addToCompare(record)}
                    >
                      Add to Compare
                    </Button>
                  ),
                },
              ]}
              dataSource={availableProducts}
              rowKey="id"
              pagination={{ pageSize: 5, showSizeChanger: false, position: ["bottomCenter"] }}
            />
          )
        ) : (
          <p>No more products available to add.</p>
        )}
      </Modal>
    </div>
  );
};

export default CompareProducts;

