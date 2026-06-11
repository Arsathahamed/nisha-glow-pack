import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { useNavigate } from "react-router-dom";
function OrdersTable({ setEditingOrder,setRefreshDashboard}) {
const navigate = useNavigate();
 const [orders, setOrders] = useState([]);
const [search, setSearch] = useState("");
// const [editingOrder, setEditingOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {

    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("id", { ascending: false });

    if (!error) {
      setOrders(data);
    }
  };
  const deleteOrder = async (id) => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this order?"
  );

  if (!confirmDelete) return;

  const { error } = await supabase
    .from("orders")
    .delete()
    .eq("id", id);

  if (!error) {
    fetchOrders();
      setRefreshDashboard(prev => prev + 1);
  } else {
    alert(error.message);
  }
};

const updateStatus = async (id, status) => {

  const { error } = await supabase
    .from("orders")
    .update({
      status: status
    })
    .eq("id", id);

 if (error) {
  alert(error.message);
} else {

  setOrders(prev =>
    prev.map(order =>
      order.id === id
        ? { ...order, status }
        : order
    )
  );

  setRefreshDashboard(prev => prev + 1);
}
};

const getWhatsAppMessage = (order) => {

  switch (order.status) {

    case "Confirmed":
      return `Hi ${order.customer_name},

Your order has been confirmed ✅

Quantity: ${order.quantity}
Amount: ₹${order.amount}

Thank you for choosing Nisha's Skin Brightening & Glow Pack.`;

    case "Packed":
      return `Hi ${order.customer_name},

Your order has been packed 📦

We will dispatch it shortly.`;

    case "Shipped":
      return `Hi ${order.customer_name},

Your order has been shipped 🚚

It will reach you soon.`;

    case "Delivered":
      return `Hi ${order.customer_name},

Your order has been delivered

Thank you for supporting Nisha's Skin Brightening & Glow Pack.

Please share your feedback.`;

    default:
      return `Hi ${order.customer_name},

Thank you for ordering Nisha's Skin Brightening & Glow Pack.

Quantity: ${order.quantity}
Amount: ₹${order.amount}

We will contact you shortly.`;
  }
};

const filteredOrders = orders.filter((order) =>
  order.customer_name?.toLowerCase().includes(search.toLowerCase()) ||
  order.phone?.includes(search)
);
  return (
   <div className="card mt-4 p-3 p-md-4 shadow border-0">

     <h3 className="text-center mb-4">
  Customer Orders
</h3>
<input
  type="text"
  className="form-control mb-4"
  placeholder="Search by Name or Phone"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>
     <div className="table-responsive">
  <table className="table table-hover align-middle">

        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Quantity</th>
            <th>Delivery</th>
            <th>Amount</th>
            <th>Status</th>
           <th>
            Action
            </th>
          </tr>
        </thead>

        <tbody>

          {filteredOrders.map((order) => (

            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customer_name}</td>
              <td>{order.phone}</td>
              <td>{order.quantity}</td>
              <td>{order.delivery_type}</td>
             <td>₹{order.amount}</td>
             <td>
  <select
  className="form-select form-select-sm w-100"
    value={order.status || "Pending"}
    onChange={(e) =>
      updateStatus(order.id, e.target.value)
    }
  >
    <option value="Pending">Pending</option>
    <option value="Confirmed">Confirmed</option>
    <option value="Packed">Packed</option>
    <option value="Shipped">Shipped</option>
    <option value="Delivered">Delivered</option>
  </select>
</td>

<td>
  <div className="d-flex flex-column flex-lg-row justify-content-center gap-2">

    <button
      className="btn btn-warning btn-sm"
      onClick={() => {
  setEditingOrder(order);
  navigate("/add-order");
}}
    >
      Edit
    </button>

    <a
      href={`https://wa.me/91${order.phone}?text=${encodeURIComponent(
        getWhatsAppMessage(order)
      )}`}
      target="_blank"
      rel="noreferrer"
      className="btn btn-success btn-sm"
    >
      WhatsApp
    </a>

    <button
      className="btn btn-danger btn-sm"
      onClick={() => deleteOrder(order.id)}
    >
      Delete
    </button>

  </div>
</td>
            </tr>

          ))}

        </tbody>

    </table>
</div>

    </div>
  );
}

export default OrdersTable;