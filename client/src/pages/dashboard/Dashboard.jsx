import React from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import {
  FaHome,
  FaHeart,
  FaCalendarAlt,
  FaBuilding,
  FaUsers,
  FaMoneyBillWave,
} from "react-icons/fa";
import { useEffect } from "react";

const Dashboard = () => {
  const role = localStorage.getItem("role"); // buyer | seller | admin

useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /* ================== Fake Data ================== */
  const stats = {
    buyer: [
      { title: "Saved Properties", value: 12, icon: <FaHeart /> },
      { title: "Appointments", value: 5, icon: <FaCalendarAlt /> },
      { title: "Purchased", value: 2, icon: <FaHome /> },
    ],
    seller: [
      { title: "Total Properties", value: 18, icon: <FaBuilding /> },
      { title: "Appointments", value: 9, icon: <FaCalendarAlt /> },
      { title: "Sold", value: 6, icon: <FaMoneyBillWave /> },
    ],
    admin: [
      { title: "Total Users", value: 540, icon: <FaUsers /> },
      { title: "Properties", value: 320, icon: <FaBuilding /> },
      { title: "Monthly Revenue", value: "$42k", icon: <FaMoneyBillWave /> },
    ],
  };

  const chartData = [
    { month: "Jan", value: 30 },
    { month: "Feb", value: 45 },
    { month: "Mar", value: 60 },
    { month: "Apr", value: 50 },
    { month: "May", value: 80 },
    { month: "Jun", value: 95 },
  ];

  const tableData = [
    { id: 1, name: "Luxury Apartment", status: "Approved", price: "$120,000" },
    { id: 2, name: "Family House", status: "Pending", price: "$90,000" },
    { id: 3, name: "Commercial Space", status: "Sold", price: "$220,000" },
  ];

  /* ================== UI ================== */
  return (
    <div className="space-y-8 p-8">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          {role === "admin"
            ? "Admin Dashboard"
            : role === "seller"
            ? "Seller Dashboard"
            : "Buyer Dashboard"}
        </h1>
        <p className="text-slate-500">
          Overview of your real estate activity
        </p>
      </div>

      {/* ================= Stats Cards ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats[role]?.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm">{item.title}</p>
                <h2 className="text-3xl font-bold text-orange-500">
                  {item.value}
                </h2>
              </div>
              <div className="text-3xl text-orange-400">
                {item.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ================= Charts ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold mb-4">
            Property Growth
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#f97316"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold mb-4">
            Monthly Activity
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#fb923c" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ================= Table ================= */}
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="font-semibold mb-4">
          Recent Properties
        </h3>

        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Property</th>
                <th>Status</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>
                    <span
                      className={`badge ${
                        item.status === "Sold"
                          ? "badge-success"
                          : item.status === "Pending"
                          ? "badge-warning"
                          : "badge-info"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td>{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
