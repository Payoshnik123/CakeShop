import React, { useState, useEffect } from "react";

const Admin = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: null,
  });

  const [products, setProducts] = useState([]);

  // load products
  const loadProducts = async () => {
    const res = await fetch("http://localhost:5000/products");
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // add product
  const handleAdd = async () => {
  if (!product.name || !product.price || !product.image || !product.category) {
    alert("Fill all fields ⚠️");
    return;
  }

  // ✅ CREATE FORMDATA HERE
  const formData = new FormData();
  formData.append("name", product.name);
  formData.append("price", product.price);
  formData.append("description", product.description);
  formData.append("category", product.category); // ✅ IMPORTANT
  formData.append("image", product.image);       // ✅ FILE

  try {
    await fetch("http://localhost:5000/add-product", {
      method: "POST",
      body: formData, // ✅ SEND FORMDATA (NOT JSON)
    });

    alert("Product added ✅");

    // reset form
    setProduct({
      name: "",
      price: "",
      description: "",
      image: null,
      category: "",
    });

    loadProducts();

  } catch (err) {
    console.log(err);
  }
};

  // delete product
  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/product/${id}`, {
      method: "DELETE",
    });
    loadProducts();
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
      <h2 style={{ textAlign: "center" }}>Admin Panel 🛠️</h2>

      <input
        type="text"
        placeholder="Cake Name"
        className="form-control mb-2"
        value={product.name}
        onChange={(e) =>
          setProduct({ ...product, name: e.target.value })
        }
      />

      <input
        type="text"
        placeholder="Price"
        className="form-control mb-2"
        value={product.price}
        onChange={(e) =>
          setProduct({ ...product, price: e.target.value })
        }
      />

      <select
          className="form-control mb-2"
          value={product.category || ""}
          onChange={(e) =>
            setProduct({ ...product, category: e.target.value })
          }
        >
          <option value="">Select Category</option>
          <option value="Chocolate">Chocolate</option>
          <option value="Fruit">Fruit</option>
          <option value="Vanilla">Vanilla</option>
          <option value="Red Velvet">Red Velvet</option>
        </select>

      <input
        type="file"
        className="form-control mb-2"
        onChange={(e) =>
          setProduct({ ...product, image: e.target.files[0] })
        }
      />

      <textarea
        placeholder="Description"
        className="form-control mb-2"
        value={product.description}
        onChange={(e) =>
          setProduct({ ...product, description: e.target.value })
        }
      />

      <div style={{ textAlign: "center" }}>
        <button onClick={handleAdd} className="btn btn-success">
          Add Cake
        </button>
      </div>

      <hr />

      <h3>All Cakes</h3>

      {products.map((p) => (
        <div key={p._id}>
          <img
            src={`http://localhost:5000${p.img}`}
            width="100"
            alt=""
          />
          <p>{p.name} - ₹{p.price}</p>
          <button onClick={() => handleDelete(p._id)} className="btn btn-success">
            Delete
          </button>
          <br></br><br></br>
        </div>
        
      ))}
    </div>
  );
};

export default Admin;