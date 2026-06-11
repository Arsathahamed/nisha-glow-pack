import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";

function OrderForm({ editingOrder, setEditingOrder }) {
const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customer_name: "",
    phone: "",
    email: "",
    address: "",
    quantity: "100g",
    delivery_type: "With Delivery"
  });

  const [amount, setAmount] = useState(260);
  const [customQuantity, setCustomQuantity] = useState("");
const [customPrice, setCustomPrice] = useState("");
{formData.quantity === "Custom" && (
  <>
    <input
      type="text"
      className="form-control mb-3"
      placeholder="Enter Quantity (Example: 2kg)"
      value={customQuantity}
      onChange={(e) => setCustomQuantity(e.target.value)}
    />

    <input
      type="number"
      className="form-control mb-3"
      placeholder="Enter Price"
      value={customPrice}
      onChange={(e) => {
        setCustomPrice(e.target.value);
        setAmount(Number(e.target.value) || 0);
      }}
    />
  </>
)}
  const prices = {
    "100g": 200,
    "200g": 400,
    "250g": 500,
    "500g": 1000,
    "1kg": 2000
  };
useEffect(() => {

if (editingOrder) {

  setFormData({
    customer_name: editingOrder.customer_name || "",
    phone: editingOrder.phone || "",
    email: editingOrder.email || "",
    address: editingOrder.address || "",
    quantity: editingOrder.quantity || "100g",
    delivery_type: editingOrder.delivery_type || "With Delivery"
  });

  setAmount(editingOrder.amount || 260);
}

}, [editingOrder]);

  const calculateAmount = (quantity, delivery) => {
    let total = prices[quantity] || 0;

    if (delivery === "With Delivery") {
      total += 60;
    }

    setAmount(total);
  };

  const handleChange = (e) => {

    const { name, value } = e.target;

    const updated = {
      ...formData,
      [name]: value
    };

    setFormData(updated);

    calculateAmount(
      updated.quantity,
      updated.delivery_type
    );
  };

 const saveOrder = async (e) => {

  e.preventDefault();
const finalQuantity =
  formData.quantity === "Custom"
    ? customQuantity
    : formData.quantity;
  if (editingOrder) {

    const { error } = await supabase
      .from("orders")
      .update({
        customer_name: formData.customer_name,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
       quantity: finalQuantity,
        delivery_type: formData.delivery_type,
        amount: amount
      })
      .eq("id", editingOrder.id);

    if (error) {

      alert(error.message);

    } else {

      alert("Order Updated");

      setEditingOrder(null);

      navigate("/orders");
    }

  } else {

    const { error } = await supabase
      .from("orders")
      .insert([
  {
  ...formData,
  quantity: finalQuantity,
  amount
}
      ]);

    if (error) {

      alert(error.message);

    } else {

      alert("Order Saved Successfully");

     navigate("/orders");
    }
  }
};

  return (
    <div className="card p-4 shadow">

      <h3>Nisha Glow Pack Order Form</h3>

      <form onSubmit={saveOrder}>

        <input
          className="form-control mb-3"
          placeholder="Customer Name"
          name="customer_name"
          value={formData.customer_name}
          onChange={handleChange}
        />

        <input
          className="form-control mb-3"
          placeholder="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />

        <input
          className="form-control mb-3"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <textarea
          className="form-control mb-3"
          placeholder="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />

       <select
  className="form-select mb-3"
  name="quantity"
  value={formData.quantity}
  onChange={handleChange}
>
  <option value="100g">100g</option>
  <option value="200g">200g</option>
  <option value="250g">250g</option>
  <option value="500g">500g</option>
  <option value="1kg">1kg</option>
  <option value="Custom">Custom Quantity</option>
</select>
{formData.quantity === "Custom" && (
  <>
    <input
      type="text"
      className="form-control mb-3"
      placeholder="Enter Custom Quantity (Example: 2kg)"
      value={customQuantity}
      onChange={(e) => setCustomQuantity(e.target.value)}
    />

    <input
      type="number"
      className="form-control mb-3"
      placeholder="Enter Price"
      value={customPrice}
      onChange={(e) => {
        setCustomPrice(e.target.value);
        setAmount(Number(e.target.value) || 0);
      }}
    />
  </>
)}
        <select
          className="form-select mb-3"
          name="delivery_type"
          value={formData.delivery_type}
          onChange={handleChange}
        >
          <option>With Delivery</option>
          <option>Without Delivery</option>
        </select>

        <h4>Amount: ₹{amount}</h4>

<button
  className="btn btn-success mt-3"
>
  {editingOrder ? "Update Order" : "Save Order"}
</button>

      </form>
    </div>
  );
}

export default OrderForm;