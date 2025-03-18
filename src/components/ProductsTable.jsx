// import { Table, Space, Button } from "antd";

// const ProductTable = ({ products, isCompared, handleCompare }) => {
//   const columns = [
//     { 
//       title: "Title", 
//       dataIndex: "title", 
//       key: "title",
//       render: (text, record) => (
//         <span style={{ fontWeight: isCompared(record.id) ? "bold" : "normal", color: isCompared(record.id) ? "#1677FF" : "inherit" }}>
//           {text}
//         </span>
//       )
//     },
//     { title: "Description", dataIndex: "description", key: "description", ellipsis: true },
//     { 
//       title: "Price ($)", 
//       dataIndex: "price", 
//       key: "price", 
//       sorter: (a, b) => a.price - b.price,
//       render: (text, record) => (
//         <span style={{ fontWeight: isCompared(record.id) ? "bold" : "normal", color: isCompared(record.id) ? "#1677FF" : "inherit" }}>
//           ${text}
//         </span>
//       )
//     },
//     { 
//       title: "Discount (%)", 
//       dataIndex: "discountPercentage", 
//       key: "discountPercentage", 
//       sorter: (a, b) => a.discountPercentage - b.discountPercentage,
//       render: (text, record) => (
//         <span style={{ fontWeight: isCompared(record.id) ? "bold" : "normal", color: isCompared(record.id) ? "#1677FF" : "inherit" }}>
//           {text}%
//         </span>
//       )
//     },
//     { 
//       title: "Brand", 
//       dataIndex: "brand", 
//       key: "brand",
//       render: (text, record) => (
//         <span style={{ fontWeight: isCompared(record.id) ? "bold" : "normal", color: isCompared(record.id) ? "#1677FF" : "inherit" }}>
//           {text}
//         </span>
//       )
//     },
//     { 
//       title: "Category", 
//       dataIndex: "category", 
//       key: "category",
//       render: (text, record) => (
//         <span style={{ fontWeight: isCompared(record.id) ? "bold" : "normal", color: isCompared(record.id) ? "#1677FF" : "inherit" }}>
//           {text}
//         </span>
//       )
//     },
//     {
//       title: "Image",
//       dataIndex: "thumbnail",
//       key: "thumbnail",
//       render: (url) => <img src={url} alt="Product" style={{ width: "50px", borderRadius: "5px" }} />
//     },
//     {
//       title: "Compare",
//       key: "compare",
//       render: (_, record) => (
//         <Space size="middle">
//           <Button type="primary" disabled={isCompared(record.id)} onClick={() => handleCompare(record)}>
//             {isCompared(record.id) ? "Added" : "Compare"}
//           </Button>
//         </Space>
//       )
//     }
//   ];

//   return <Table columns={columns} dataSource={products} rowKey="id" pagination={{ position: ["bottomCenter"] }}   className="bg-gray-800 text-white shadow-lg rounded-lg overflow-hidden"
// />;
// };

// export default ProductTable;



import { Table, Space, Button } from "antd";
import { useEffect, useState } from "react";

const ProductTable = ({ products, isCompared, handleCompare }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Detect screen resize for responsiveness
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const columns = [
    { title: "Title", dataIndex: "title", key: "title", width: 150 },
    { title: "Description", dataIndex: "description", key: "description", width: 250, ellipsis: true },
    { title: "Price ($)", dataIndex: "price", key: "price", width: 120 },
    { title: "Discount (%)", dataIndex: "discountPercentage", key: "discountPercentage", width: 120 },
    { title: "Brand", dataIndex: "brand", key: "brand", width: 150 },
    { title: "Category", dataIndex: "category", key: "category", width: 150 },
    {
      title: "Image",
      dataIndex: "thumbnail",
      key: "thumbnail",
      width: 120,
      render: (url) => <img src={url} alt="Product" className="w-16 h-16 object-cover rounded-md" />,
    },
    {
      title: "Compare",
      key: "compare",
      width: 120,
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" disabled={isCompared(record.id)} onClick={() => handleCompare(record)}>
            {isCompared(record.id) ? "Added" : "Compare"}
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="bg-gray-900 p-4 rounded-lg">
      {isMobile ? (
        <div className="space-y-4">
          {products.map((product) => (
            <div key={product.id} className="bg-gray-800 text-white p-4 rounded-lg shadow-lg">
              <div className="flex items-center space-x-4">
                <img src={product.thumbnail} alt="Product" className="w-20 h-20 object-cover rounded-md" />
                <div>
                  <h3 className="text-lg font-semibold text-blue-400">{product.title}</h3>
                  <p className="text-gray-400 text-sm">{product.description}</p>
                  <p className="text-white font-bold">Price: ${product.price}</p>
                  <p className="text-green-400">Discount: {product.discountPercentage}%</p>
                  <p className="text-yellow-400">Brand: {product.brand}</p>
                  <p className="text-red-400">Category: {product.category}</p>
                  <Button
                    type="primary"
                    className="mt-2"
                    disabled={isCompared(product.id)}
                    onClick={() => handleCompare(product)}
                  >
                    {isCompared(product.id) ? "Added" : "Compare"}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={products}
          rowKey="id"
          pagination={{ position: ["bottomCenter"] }}
          className="bg-gray-800 text-white shadow-lg rounded-lg"
          scroll={{ x: 1000 }}
        />
      )}
    </div>
  );
};

export default ProductTable;
