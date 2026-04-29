import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const [cake, setCake] = useState(null);

  useEffect(() => {
    const loadCake = async () => {
      try {
        const res = await fetch(`http://localhost:5000/product/${id}`);
        const data = await res.json();
        setCake(data);
      } catch (err) {
        console.log(err);
      }
    };

    loadCake();
  }, [id]);

  if (!cake) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <img
        src={`http://localhost:5000${cake.img}`}
        alt={cake.name}
        style={{ width: "300px", borderRadius: "10px" }}
      />

      <h2>{cake.name}</h2>
      <h3>₹{cake.price}</h3>
      <p>{cake.description}</p>
    </div>
  );
};

export default ProductDetails;