import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Address = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 👉 carry Buy Now item forward
  const buyNowItem = location.state?.item;

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    city: "",
    pincode: "",
    fullAddress: "",
  });

  const handleSubmit = () => {
    if (
      !address.name ||
      !address.phone ||
      !address.city ||
      !address.pincode ||
      !address.fullAddress
    ) {
      alert("Please fill all fields ⚠️");
      return;
    }

    // 👉 save address in localStorage
    localStorage.setItem("address", JSON.stringify(address));

    // 👉 go to payment (pass Buy Now item if exists)
    navigate("/payment", { state: { item: buyNowItem } });
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <h2>Delivery Address 📍</h2>

      <input
        placeholder="Full Name"
        value={address.name}
        onChange={(e) =>
          setAddress({ ...address, name: e.target.value })
        }
        className="form-control mb-2"
      />

      <input
        placeholder="Phone Number"
        value={address.phone}
        onChange={(e) =>
          setAddress({ ...address, phone: e.target.value })
        }
        className="form-control mb-2"
      />

      <input
        placeholder="City"
        value={address.city}
        onChange={(e) =>
          setAddress({ ...address, city: e.target.value })
        }
        className="form-control mb-2"
      />

      <input
        placeholder="Pincode"
        value={address.pincode}
        onChange={(e) =>
          setAddress({ ...address, pincode: e.target.value })
        }
        className="form-control mb-2"
      />

      <textarea
        placeholder="Full Address"
        value={address.fullAddress}
        onChange={(e) =>
          setAddress({ ...address, fullAddress: e.target.value })
        }
        className="form-control mb-2"
      />

      <button
        onClick={handleSubmit}
        style={{
          background: "#ec4899",
          color: "white",
          padding: "10px",
          border: "none",
          borderRadius: "8px",
          width: "100%",
        }}
      >
        Continue to Payment →
      </button>
    </div>
  );
};

export default Address;