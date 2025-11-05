import React from "react";

function ProductCard({ name, price, inStock }) {
  return (
    <div style={{
      border: "1px solid #ccc",
      borderRadius: "8px",
      padding: "16px",
      margin: "10px",
      width: "220px",
      textAlign: "center",
    }}>
      <h2>{name}</h2>
      <p> Price: ${price}</p>
      <p>
        {inStock ? " In Stock" : " Out of Stock"}
      </p>
    </div>
  );
}

function App() {
  return (
    <div style={{ padding: "20px" }}>
      {/* Heading */}
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
         Product List
      </h1>

      {/* Product Cards */}
    <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
      <ProductCard name="Wireless Mouse" price={25.99} inStock={true} />
      <ProductCard name="Keyboard" price={45.5} inStock={false} />
      <ProductCard name="Monitor" price={199.99} inStock={true} />
    </div>
  </div>
  );
}

export default App;