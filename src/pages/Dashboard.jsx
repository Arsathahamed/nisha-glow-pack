import { useEffect, useState } from "react";
import { supabase } from "../supabase";

function Dashboard({ refreshDashboard }) {

  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    deliveredOrders: 0
  });

useEffect(() => {
  fetchStats();
}, [refreshDashboard]);

  const fetchStats = async () => {

    const { data, error } = await supabase
      .from("orders")
      .select("*");

    if (error) {
      console.log(error);
      return;
    }

    const totalOrders = data.length;

    const totalRevenue = data.reduce(
      (sum, order) => sum + Number(order.amount || 0),
      0
    );

    const pendingOrders = data.filter(
      order => order.status === "Pending"
    ).length;

    const deliveredOrders = data.filter(
      order => order.status === "Delivered"
    ).length;

    setStats({
      totalOrders,
      totalRevenue,
      pendingOrders,
      deliveredOrders
    });
  };

  return (
    <div className="row mb-4">

      <div className="col-md-3">
        <div className="card text-center shadow">
          <div className="card-body">
            <h6>Total Orders</h6>
            <h2>{stats.totalOrders}</h2>
          </div>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card text-center shadow">
          <div className="card-body">
            <h6>Total Revenue</h6>
            <h2>₹{stats.totalRevenue}</h2>
          </div>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card text-center shadow">
          <div className="card-body">
            <h6>Pending Orders</h6>
            <h2>{stats.pendingOrders}</h2>
          </div>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card text-center shadow">
          <div className="card-body">
            <h6>Delivered Orders</h6>
            <h2>{stats.deliveredOrders}</h2>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Dashboard;