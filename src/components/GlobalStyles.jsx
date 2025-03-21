const GlobalStyles = () => (
    <style jsx global>{`
      /* Custom animations */
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      .animated-table {
        animation: fadeIn 0.5s ease-out;
      }
      
      .animate-pulse {
        animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
      }
      
      @keyframes pulse {
        0%, 100% { opacity: 0.1; }
        50% { opacity: 0.3; }
      }
      
      /* Custom Ant Design overrides */
      .custom-pagination .ant-pagination-item-active {
        background-color: #3B82F6 !important;
        border-color: transparent !important;
      }
      
      .custom-pagination .ant-pagination-item-active a {
        color: white !important;
      }
      
      .custom-pagination .ant-pagination-item:hover {
        border-color: #3B82F6 !important;
      }
      
      .custom-pagination .ant-pagination-item:hover a {
        color: #3B82F6 !important;
      }
      
      .ant-table {
        background: transparent !important;
        color: #E2E8F0 !important;
      }
      
      .ant-table-thead > tr > th {
        border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
        color: #93C5FD !important;
      }
      
      .ant-table-tbody > tr > td {
        border-bottom: 1px solid rgba(255, 255, 255, 0.05) !important;
        transition: all 0.3s !important;
      }
      
      .ant-table-tbody > tr:hover > td {
        background-color: rgba(59, 130, 246, 0.1) !important;
      }
      
      .ant-empty-description {
        color: #94A3B8 !important;
      }
      
      .ant-modal-content {
        background-color: #1F2937 !important;
        border-radius: 12px !important;
        overflow: hidden !important;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5) !important;
      }
      
      .ant-modal-header {
        background-color: #111827 !important;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
        padding: 16px 24px !important;
      }
      
      .ant-modal-title {
        color: #E2E8F0 !important;
      }
      
      .ant-spin-text {
        color: #3B82F6 !important;
      }
      
      .ant-spin-dot-item {
        background-color: #3B82F6 !important;
      }
      
      .ant-badge-count {
        box-shadow: 0 0 0 2px #111827 !important;
      }
    `}</style>
  );
  
  export default GlobalStyles;
  