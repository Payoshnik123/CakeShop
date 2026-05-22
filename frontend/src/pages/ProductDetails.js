import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetails = ({ cart, setCart }) => {
  const { id } = useParams();

  const [cake, setCake] = useState(null);

  // ⭐ Review states
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);

  
  useEffect(() => {
    const loadCake = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/product/${id}`
        );

        const data = await res.json();

        setCake(data);
      } catch (err) {
        console.log(err);
      }
    };

    loadCake();
  }, [id]);

  // ✅ Add to cart
  const addToCart = () => {
    const existing = cart.find(
      (item) => item._id === cake._id
    );

    let updatedCart;

    if (existing) {
      updatedCart = cart.map((item) =>
        item._id === cake._id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      );
    } else {
      updatedCart = [
        ...cart,
        { ...cake, quantity: 1 },
      ];
    }

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    alert("Added to cart 🛒");
  };

  // ⭐ Submit review
  const submitReview = async () => {
    try {
      const userEmail =
        localStorage.getItem("userEmail");

      if (!userEmail) {
        alert("Please login first ⚠️");
        return;
      }

      if (!comment) {
        alert("Write review first ✍️");
        return;
      }

      await fetch(
        `http://localhost:5000/add-review/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: userEmail,
            comment,
            rating,
          }),
        }
      );

      // ✅ reload updated cake
      const res = await fetch(
        `http://localhost:5000/product/${id}`
      );

      const data = await res.json();

      setCake(data);

      setComment("");
      setRating(5);

      alert("Review added ⭐");

    } catch (err) {
      console.log(err);
      alert("Review failed ❌");
    }
  };

  // ⏳ Loading
  if (!cake) {
    return (
      <h2 style={{ textAlign: "center" }}>
        Loading...
      </h2>
    );
  }

  return (
    <div style={container}>

      {/* 🍰 IMAGE */}
      <img
        src={`http://localhost:5000${cake.img}`}
        alt={cake.name}
        style={image}
      />

      {/* 📄 DETAILS */}
      <div style={details}>

        <h1>{cake.name}</h1>

        <h2 style={{ color: "#ec4899" }}>
          ₹{cake.price}
        </h2>

        <p>
          Delicious fresh cake made with love ❤️
        </p>

        <button
          style={cartBtn}
          onClick={addToCart}
        >
          Add To Cart 🛒
        </button>

        {/* ⭐ REVIEW SECTION */}
        <div style={reviewSection}>

          <h2>Customer Reviews ⭐</h2>

          {/* ✍️ Add review */}
          <textarea
            placeholder="Write your review..."
            value={comment}
            onChange={(e) =>
              setComment(e.target.value)
            }
            style={textarea}
          />

          <br />

          <select
            value={rating}
            onChange={(e) =>
              setRating(e.target.value)
            }
            style={select}
          >
            <option value="1">1 ⭐</option>
            <option value="2">2 ⭐</option>
            <option value="3">3 ⭐</option>
            <option value="4">4 ⭐</option>
            <option value="5">5 ⭐</option>
          </select>

          <br />

          <button
            style={reviewBtn}
            onClick={submitReview}
          >
            Submit Review
          </button>

          {/* ⭐ Show reviews */}
          <div style={{ marginTop: "30px" }}>

            {cake.reviews?.length > 0 ? (
              cake.reviews.map((review, i) => (
                <div key={i} style={reviewCard}>

                  <h4>
                    👤 {review.user}
                  </h4>

                  <p>{review.comment}</p>

                  <span>
                    {review.rating} ⭐
                  </span>

                </div>
              ))
            ) : (
              <p>No reviews yet 😢</p>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};

/* 🎨 STYLES */

const container = {
  display: "flex",
  gap: "40px",
  padding: "40px",
  flexWrap: "wrap",
};

const image = {
  width: "350px",
  borderRadius: "20px",
};

const details = {
  flex: 1,
};

const cartBtn = {
  padding: "12px 20px",
  border: "none",
  background: "#ec4899",
  color: "white",
  borderRadius: "10px",
  cursor: "pointer",
  marginTop: "10px",
};

const reviewSection = {
  marginTop: "40px",
};

const textarea = {
  width: "100%",
  height: "100px",
  padding: "10px",
  borderRadius: "10px",
  border: "1px solid #ccc",
};

const select = {
  marginTop: "10px",
  padding: "10px",
  borderRadius: "10px",
};

const reviewBtn = {
  marginTop: "15px",
  padding: "10px 20px",
  border: "none",
  background: "#111827",
  color: "white",
  borderRadius: "10px",
  cursor: "pointer",
};

const reviewCard = {
  border: "1px solid #ddd",
  padding: "15px",
  borderRadius: "10px",
  marginBottom: "15px",
};

export default ProductDetails;