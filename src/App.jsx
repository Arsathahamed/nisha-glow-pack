import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import AddOrder from "./pages/AddOrder";
import Orders from "./pages/Orders";

function App() {

  const [editingOrder, setEditingOrder] =
    useState(null);

  const [refreshDashboard, setRefreshDashboard] =
    useState(0);

  return (
    <BrowserRouter>

      <Sidebar />

      <div
        style={{
          // marginLeft: "270px",
          padding: "40px"
        }}
      >

        <Routes>

          <Route
            path="/"
            element={
              <Dashboard
                refreshDashboard={
                  refreshDashboard
                }
              />
            }
          />

          <Route
            path="/add-order"
            element={
              <AddOrder
                editingOrder={editingOrder}
                setEditingOrder={
                  setEditingOrder
                }
              />
            }
          />

          <Route
            path="/orders"
            element={
              <Orders
                setEditingOrder={
                  setEditingOrder
                }
                setRefreshDashboard={
                  setRefreshDashboard
                }
              />
            }
          />

        </Routes>

      </div>

    </BrowserRouter>
  );
}

export default App;