
import { Table, Space, Button } from "antd";
import { useState, useEffect } from "react";

const ProductTable = ({ products, isCompared, handleCompare }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [bgImage, setBgImage] = useState("https://source.unsplash.com/random/1600x900?dark,abstract");

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    
    const img = new Image();
    img.src = bgImage;
    img.onerror = () => setBgImage("https://via.placeholder.com/1600x900/1a1a2e/ffffff");
    
    return () => window.removeEventListener("resize", handleResize);
  }, [bgImage]);

  const glassStyle = {
    backgroundColor: "rgba(17, 25, 40, 0.75)",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(255, 255, 255, 0.125)",
    borderRadius: "12px"
  };

  const columns = [
    { 
      title: "Title", 
      dataIndex: "title", 
      key: "title",
      render: (text, record) => (
        <span style={{ 
          fontWeight: isCompared(record.id) ? "600" : "normal", 
          color: isCompared(record.id) ? "#3B82F6" : "#E2E8F0",
          transition: "all 0.3s ease",
          fontSize: isCompared(record.id) ? "1.05rem" : "1rem"
        }} className="hover:text-blue-300 transition-colors duration-300">{text}</span>
      )
    },
    ...(windowWidth > 768 ? [
      { 
        title: "Description", 
        dataIndex: "description", 
        key: "description", 
        ellipsis: true,
        render: (text) => <span className="text-gray-300 italic text-sm">{text}</span>
      },
      { 
        title: "Price ($)", 
        dataIndex: "price", 
        key: "price", 
        sorter: (a, b) => a.price - b.price,
        render: (text, record) => (
          <div className="group relative">
            <span style={{ 
              fontWeight: isCompared(record.id) ? "bold" : "normal", 
              color: isCompared(record.id) ? "#3B82F6" : "#E2E8F0",
              transition: "all 0.3s ease"
            }} className="hover:scale-110 inline-block transform transition-transform duration-300">${text}</span>
            {record.discountPercentage > 15 && (
              <span className="absolute -top-3 -right-3 bg-green-500 text-white text-xs rounded-full px-2 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Deal!</span>
            )}
          </div>
        )
      },
      { 
        title: "Discount (%)", 
        dataIndex: "discountPercentage", 
        key: "discountPercentage", 
        sorter: (a, b) => a.discountPercentage - b.discountPercentage,
        render: (text, record) => (
          <span style={{ 
            fontWeight: isCompared(record.id) ? "bold" : "normal", 
            color: text > 15 ? "#10B981" : isCompared(record.id) ? "#3B82F6" : "#E2E8F0",
            transition: "all 0.3s ease"
          }} className="hover:scale-110 inline-block transform transition-transform duration-300">{text}%</span>
        )
      },
      { 
        title: "Brand", 
        dataIndex: "brand", 
        key: "brand",
        render: (text) => <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded-md text-xs inline-block hover:bg-gray-600 transition-colors duration-300">{text}</span>
      },
      { 
        title: "Category", 
        dataIndex: "category", 
        key: "category",
        render: (text) => <span className="px-2 py-1 bg-blue-900/50 text-blue-200 rounded-md text-xs inline-block hover:bg-blue-800/50 transition-colors duration-300">{text}</span>
      },
      {
        title: "Image",
        dataIndex: "thumbnail",
        key: "thumbnail",
        render: (url) => (
          <div className="overflow-hidden rounded-md">
            <img src={url} alt="Product" className="w-16 h-16 object-cover rounded-md hover:scale-125 transform transition-all duration-500 hover:rotate-3" style={{boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"}}/>
          </div>
        )
      }
    ] : []),
    {
      title: "Compare",
      key: "compare",
      render: (_, record) => (
        <Space size="middle">
          <Button 
            type="primary" 
            disabled={isCompared(record.id)} 
            onClick={() => handleCompare(record)}
            className="hover:scale-105 active:scale-95 transform transition-all duration-300 hover:shadow-lg"
            style={{
              background: isCompared(record.id) ? "#374151" : "#3B82F6",
              borderRadius: "8px",
              border: "none",
              boxShadow: isCompared(record.id) ? "none" : "0 4px 6px rgba(59, 130, 246, 0.5)"
            }}
          >
            {isCompared(record.id) ? "✓ Added" : "Compare"}
          </Button>
        </Space>
      )
    }
  ];

  return (
    <div style={{
      background: `linear-gradient(rgba(17, 24, 39, 0.85), rgba(17, 24, 39, 0.95)), url(${bgImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      padding: "20px",
      borderRadius: "16px",
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      position: "relative",
      overflow: "hidden"
    }} className="transition-all duration-500 hover:shadow-2xl relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-32 -mt-32 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -ml-32 -mb-32 animate-pulse" style={{animationDelay: "1s"}}></div>
      
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-white mb-2 opacity-0 animate-fadeIn" style={{animationDelay: "0.3s", animationFillMode: "forwards"}}>Product Comparison</h2>
        <p className="text-blue-300 opacity-0 animate-fadeIn" style={{animationDelay: "0.6s", animationFillMode: "forwards"}}>Select items to compare features</p>
      </div>
    
      <Table 
        columns={columns} 
        dataSource={products} 
        rowKey="id" 
        pagination={{ 
          position: ["bottomCenter"],
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "15", "20"],
          className: "custom-pagination"
        }} 
        className="opacity-0 animate-fadeIn"
        style={{...glassStyle, animationDelay: "0.9s", animationFillMode: "forwards"}}
        onRow={(record) => ({
          className: `hover:bg-blue-900/20 transition-all duration-300 ${isCompared(record.id) ? 'bg-blue-900/10 border-l-4 border-blue-500' : 'border-l-4 border-transparent'}`,
        })}
        components={{
          header: {
            cell: (props) => <th {...props} className="bg-gray-900/80 text-blue-300 font-medium py-4 first:rounded-tl-lg last:rounded-tr-lg" />
          },
        }}
      />
      
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.6s ease-out; }
        .animate-pulse { animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        @keyframes pulse {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.3; }
        }
        .custom-pagination .ant-pagination-item-active {
          background-color: #3B82F6;
          border-color: transparent;
        }
        .custom-pagination .ant-pagination-item-active a { color: white; }
        .custom-pagination .ant-pagination-item:hover { border-color: #3B82F6; }
        .custom-pagination .ant-pagination-item:hover a { color: #3B82F6; }
        .ant-table { background: transparent !important; color: #E2E8F0; }
        .ant-table-thead > tr > th {
          border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
          color: #93C5FD !important;
          font-weight: 600 !important;
        }
        .ant-table-tbody > tr > td {
          border-bottom: 1px solid rgba(255, 255, 255, 0.05) !important;
          transition: all 0.3s !important;
        }
        .ant-table-tbody > tr:hover > td {
          background-color: rgba(59, 130, 246, 0.1) !important;
        }
      `}</style>
    </div>
  );
};

export default ProductTable;