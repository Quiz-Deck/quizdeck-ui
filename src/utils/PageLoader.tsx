import React from "react";

const styles = {
  loader: {
    border: "16px solid #f3f3f3",
    borderRadius: "50%",
    borderTop: "16px solid #3498db",
    width: "120px",
    height: "120px",
    WebkitAnimation: "spin 2s linear infinite" /* Safari */,
    animation: "spin 2s linear infinite",
  },
  // Add keyframes here if needed
};

const PageLoader: React.FC = () => {
  return <div style={styles.loader}></div>;
};

export default PageLoader;
