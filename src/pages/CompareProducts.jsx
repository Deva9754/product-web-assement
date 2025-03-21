
import { useState, useEffect } from "react";
import { Table, Button, Modal, Empty, Spin, Badge } from "antd";
import { DeleteOutlined, PlusOutlined, CloseOutlined, SwapOutlined } from "@ant-design/icons";
import GlobalStyles from "../components/GlobalStyles";

const CompareProducts = ({ compareList = [], setCompareList, allProducts }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [availableProducts, setAvailableProducts] = useState([]);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    setTimeout(() => {
      setCompareList(compareList.filter((product) => product.id !== id));
      setLoading(false);
    }, 300); // Small delay for animation effect
  };

  const addToCompare = (product) => {
    if (compareList.length < 4) {
      setLoading(true);
      setTimeout(() => {
        setCompareList([...compareList, product]);
        setLoading(false);
        setIsModalOpen(false);
      }, 300); // Small delay for animation effect
    }
  };

  // Glass morphism styles
  const glassStyle = {
    backgroundColor: "rgba(17, 25, 40, 0.7)",
    backdropFilter: "blur(16px)",
    border: "1px solid rgba(255, 255, 255, 0.125)",
    borderRadius: "12px"
  };

  const columns = [
    { 
      title: "Title", 
      dataIndex: "title", 
      key: "title",
      render: (text) => (
        <span className="text-blue-300 font-medium hover:text-blue-200 transition-colors duration-300">
          {text}
        </span>
      )
    },
    { 
      title: "Brand", 
      dataIndex: "brand", 
      key: "brand",
      render: (text) => (
        <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded-md text-xs">
          {text}
        </span>
      )
    },
    { 
      title: "Category", 
      dataIndex: "category", 
      key: "category",
      render: (text) => (
        <span className="px-2 py-1 bg-indigo-900/50 text-indigo-200 rounded-md text-xs">
          {text}
        </span>
      )
    },
    { 
      title: "Price ($)", 
      dataIndex: "price", 
      key: "price",
      render: (text) => (
        <span className="text-white font-semibold hover:scale-110 inline-block transform transition-all duration-300">
          ${text}
        </span>
      )
    },
    { 
      title: "Discount (%)", 
      dataIndex: "discountPercentage", 
      key: "discountPercentage",
      render: (text) => (
        <span className={`${text > 15 ? 'text-green-400' : 'text-gray-300'} hover:scale-110 inline-block transform transition-all duration-300`}>
          {text}%
          {text > 15 && (
            <span className="ml-2 inline-block animate-pulse">🔥</span>
          )}
        </span>
      )
    },
    {
      title: "Image",
      dataIndex: "thumbnail",
      key: "thumbnail",
      render: (url) => (
        <div className="overflow-hidden rounded-md">
          <img 
            src={url} 
            alt="Product" 
            className="w-16 h-16 object-cover rounded-md hover:scale-125 hover:rotate-3 transform transition-all duration-500" 
            style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }}
          />
        </div>
      ),
    },
    {
      title: "Remove",
      key: "remove",
      render: (_, record) => (
        <Button 
          danger 
          icon={<DeleteOutlined />} 
          onClick={() => removeFromCompare(record.id)}
          className="hover:scale-105 hover:shadow-lg active:scale-95 transition-all duration-300"
          style={{ 
            borderRadius: "8px",
            background: "rgba(220, 38, 38, 0.8)",
            borderColor: "transparent"
          }}
        >
          Remove
        </Button>
      ),
    },
  ];

  const modalColumns = [
    { 
      title: "Title", 
      dataIndex: "title", 
      key: "title",
      render: (text) => (
        <span className="text-blue-300 font-medium">{text}</span>
      )
    },
    { 
      title: "Brand", 
      dataIndex: "brand", 
      key: "brand",
      render: (text) => (
        <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded-md text-xs">
          {text}
        </span>
      )
    },
    { 
      title: "Category", 
      dataIndex: "category", 
      key: "category",
      render: (text) => (
        <span className="px-2 py-1 bg-indigo-900/50 text-indigo-200 rounded-md text-xs">
          {text}
        </span>
      )
    },
    { 
      title: "Price ($)", 
      dataIndex: "price", 
      key: "price",
      render: (text) => (
        <span className="text-white font-semibold">${text}</span>
      )
    },
    {
      title: "Image",
      dataIndex: "thumbnail",
      key: "thumbnail",
      render: (url) => (
        <div className="overflow-hidden rounded-md">
          <img 
            src={url} 
            alt="Product" 
            className="w-12 h-12 object-cover rounded-md hover:scale-110 transform transition-all duration-300" 
          />
        </div>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          type="primary"
          icon={<PlusOutlined />}
          disabled={compareList.length >= 4}
          onClick={() => addToCompare(record)}
          className="hover:scale-105 active:scale-95 transition-all duration-300"
          style={{ 
            borderRadius: "8px",
            background: "linear-gradient(to right, #3B82F6, #2563EB)",
            borderColor: "transparent" 
          }}
        >
          Add
        </Button>
      ),
    },
  ];

  return (
    <div 
      style={{
        background: `linear-gradient(135deg, rgba(17, 24, 39, 0.95), rgba(28, 25, 63, 0.9))`,
        padding: "24px",
        borderRadius: "16px",
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
        position: "relative",
        overflow: "hidden"
      }}
      className="transition-all duration-500 hover:shadow-2xl relative"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -mr-48 -mt-48 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl -ml-40 -mb-40 animate-pulse" style={{ animationDelay: "1.5s" }}></div>
      
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-3">
          <h2 className="text-2xl font-bold text-white mb-0">
            <SwapOutlined className="mr-2 text-blue-400" /> Compare Products
          </h2>
          <Badge count={compareList.length} overflowCount={4} style={{ backgroundColor: '#3B82F6' }} />
        </div>
        
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          onClick={() => setIsModalOpen(true)} 
          disabled={compareList.length >= 4}
          className="hover:scale-105 active:scale-95 transition-all duration-300"
          style={{ 
            borderRadius: "8px",
            background: "linear-gradient(to right, #3B82F6, #2563EB)",
            borderColor: "transparent",
            boxShadow: "0 4px 6px rgba(59, 130, 246, 0.5)"
          }}
        >
          Add More
        </Button>
      </div>

      <div className="mb-3">
        <p className="text-blue-200 opacity-80">
          {compareList.length === 0 
            ? "Select products to compare features and specifications" 
            : compareList.length >= 4 
              ? "Maximum products added (4 of 4)" 
              : `${compareList.length} of 4 products selected for comparison`}
        </p>
      </div>

      <Spin spinning={loading} tip="Updating comparison..." wrapperClassName="w-full">
        {compareList.length === 0 ? (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={
              <span className="text-gray-400">No products added for comparison</span>
            }
            className="my-8 bg-gray-800/50 p-8 rounded-lg"
          />
        ) : isMobile ? (
          <div className="space-y-4">
            {compareList.map((product) => (
              <div 
                key={product.id} 
                className="hover:shadow-xl transition-all duration-300"
                style={glassStyle}
              >
                <div className="flex items-center space-x-4 p-4">
                  <div className="overflow-hidden rounded-md flex-shrink-0">
                    <img 
                      src={product.thumbnail} 
                      alt="Product" 
                      className="w-20 h-20 object-cover rounded-md hover:scale-110 transform transition-all duration-500" 
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-blue-400">{product.title}</h3>
                    <p className="text-gray-400 text-sm">
                      <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded-md text-xs inline-block">
                        {product.brand}
                      </span>
                    </p>
                    <p>
                      <span className="px-2 py-1 bg-indigo-900/50 text-indigo-200 rounded-md text-xs inline-block">
                        {product.category}
                      </span>
                    </p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      <p className="text-white font-bold mb-0">
                        ${product.price}
                      </p>
                      <p className={`${product.discountPercentage > 15 ? 'text-green-400' : 'text-gray-300'} mb-0`}>
                        {product.discountPercentage}% off
                        {product.discountPercentage > 15 && <span className="ml-1 inline-block animate-pulse">🔥</span>}
                      </p>
                    </div>
                    <Button 
                      danger 
                      icon={<DeleteOutlined />}
                      className="mt-2 hover:scale-105 active:scale-95 transition-all duration-300"
                      onClick={() => removeFromCompare(product.id)}
                      style={{ 
                        borderRadius: "8px",
                        background: "rgba(220, 38, 38, 0.8)",
                        borderColor: "transparent"
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={glassStyle}>
            <Table 
              columns={columns} 
              dataSource={compareList} 
              rowKey="id" 
              pagination={false}
              className="animated-table"
              rowClassName={() => "hover:bg-blue-900/20 transition-colors duration-300"}
              components={{
                header: {
                  cell: (props) => (
                    <th 
                      {...props} 
                      className="bg-gray-900/80 text-blue-300 font-medium py-4 first:rounded-tl-lg last:rounded-tr-lg"
                    />
                  ),
                },
              }}
            />
          </div>
        )}
      </Spin>

      <Modal
        title={
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-blue-300">
              <PlusOutlined className="mr-2" /> Add More Products
            </span>
            <span className="text-sm text-gray-400">
              {compareList.length}/4 selected
            </span>
          </div>
        }
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        centered
        width={isMobile ? "90%" : 900}
        style={{ top: 50 }}
        bodyStyle={{ 
          padding: 0,
          overflow: "hidden", 
          borderRadius: "0 0 8px 8px" 
        }}
        className="custom-modal"
        closeIcon={
          <CloseOutlined className="text-gray-400 hover:text-white transition-colors" />
        }
      >
        <div className="p-4 bg-gray-900" style={{ maxHeight: "80vh", overflow: "auto" }}>
          {availableProducts.length > 0 ? (
            isMobile ? (
              <div className="grid grid-cols-1 gap-4">
                {availableProducts.map((product) => (
                  <div 
                    key={product.id} 
                    className="hover:shadow-lg transition-all duration-300"
                    style={glassStyle}
                  >
                    <div className="flex items-center space-x-4 p-4">
                      <div className="overflow-hidden rounded-md flex-shrink-0">
                        <img 
                          src={product.thumbnail} 
                          alt="Product" 
                          className="w-16 h-16 object-cover rounded-md hover:scale-110 transform transition-all duration-300" 
                        />
                      </div>
                      <div className="flex-grow">
                        <h3 className="text-md font-semibold text-blue-400">{product.title}</h3>
                        <p className="text-gray-400 text-sm mb-1">
                          <span className="px-2 py-0.5 bg-gray-700 text-gray-300 rounded-md text-xs inline-block mr-2">
                            {product.brand}
                          </span>
                          <span className="px-2 py-0.5 bg-indigo-900/50 text-indigo-200 rounded-md text-xs inline-block">
                            {product.category}
                          </span>
                        </p>
                        <p className="text-white font-bold mb-1">
                          ${product.price}
                          {product.discountPercentage > 15 && (
                            <span className="ml-2 text-green-400 text-xs">({product.discountPercentage}% off)</span>
                          )}
                        </p>
                        <Button
                          type="primary"
                          icon={<PlusOutlined />}
                          disabled={compareList.length >= 4}
                          onClick={() => addToCompare(product)}
                          className="hover:scale-105 active:scale-95 transition-all duration-300"
                          style={{ 
                            borderRadius: "8px",
                            background: "linear-gradient(to right, #3B82F6, #2563EB)",
                            borderColor: "transparent" 
                          }}
                        >
                          Add to Compare
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={glassStyle}>
                <Table
                  columns={modalColumns}
                  dataSource={availableProducts}
                  rowKey="id"
                  pagination={{ 
                    pageSize: 5, 
                    showSizeChanger: false, 
                    position: ["bottomCenter"],
                    className: "custom-pagination"
                  }}
                  className="animated-table"
                  rowClassName="hover:bg-blue-900/20 transition-colors duration-300"
                  components={{
                    header: {
                      cell: (props) => (
                        <th 
                          {...props} 
                          className="bg-gray-900/80 text-blue-300 font-medium py-4 first:rounded-tl-lg last:rounded-tr-lg"
                        />
                      ),
                    },
                  }}
                />
              </div>
            )
          ) : (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={
                <span className="text-gray-400">No more products available to add</span>
              }
              className="my-8 p-8"
            />
          )}
        </div>
      </Modal>

  <GlobalStyles/>
    </div>
  );
};

export default CompareProducts;