import React, { useEffect } from "react";
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
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";

const Dashboard = () => {
  const role = localStorage.getItem("role"); // buyer | seller | admin

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /* ================== Fake Data ================== */
  const stats = {
    buyer: [
      { title: "Saved Properties", value: 12, icon: <FaHeart />, trend: "+2" },
      { title: "Appointments", value: 5, icon: <FaCalendarAlt />, trend: "+1" },
      { title: "Purchased", value: 2, icon: <FaHome />, trend: "0" },
    ],
    seller: [
      { title: "Total Properties", value: 18, icon: <FaBuilding />, trend: "+3" },
      { title: "Appointments", value: 9, icon: <FaCalendarAlt />, trend: "+5" },
      { title: "Sold", value: 6, icon: <FaMoneyBillWave />, trend: "+1" },
    ],
    admin: [
      { title: "Total Users", value: 540, icon: <FaUsers />, trend: "+12%" },
      { title: "Properties", value: 320, icon: <FaBuilding />, trend: "+8%" },
      { title: "Monthly Revenue", value: "$42k", icon: <FaMoneyBillWave />, trend: "+15%" },
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
    { id: 4, name: "Seaside Villa", status: "Approved", price: "$450,000" },
  ];

  /* ================== UI Components ================== */
  const Card = ({ children, className = "" }) => (
    <div
      className={`bg-[#0f0f0f]/60 backdrop-blur-2xl border border-white/5 rounded-3xl p-6 shadow-xl ${className}`}
    >
      {children}
    </div>
  );

  return (
    <div className="space-y-8 p-8 min-h-screen text-gray-200">
      {/* Title Section */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold text-white tracking-tight">
            {role === "admin"
              ? "Admin Overview"
              : role === "seller"
                ? "Seller Dashboard"
                : "My Dashboard"}
          </h1>
          <p className="text-gray-500 mt-2 font-medium">
            Welcome back! Here's what's happening today.
          </p>
        </div>
        <div className="text-right hidden sm:block">
          <p className="text-sm text-gray-500 uppercase tracking-widest font-bold">Current Plan</p>
          <p className="text-orange-500 font-bold">Premium Member</p>
        </div>
      </div>

      {/* ================= Stats Cards ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats[role]?.map((item, idx) => (
          <Card key={idx} className="relative overflow-hidden group hover:border-orange-500/30 transition-all duration-300">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="text-6xl text-white">{item.icon}</span>
            </div>
            <div className="flex flex-col justify-between h-full relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-white/5 rounded-2xl text-orange-400 text-xl border border-white/5 shadow-inner">
                  {item.icon}
                </div>
                <span className="text-xs font-bold text-green-400 bg-green-400/10 px-2 py-1 rounded-lg flex items-center gap-1">
                  <FaArrowUp size={10} /> {item.trend}
                </span>
              </div>
              <div>
                <h2 className="text-4xl font-bold text-white tracking-tight mb-1">
                  {item.value}
                </h2>
                <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">{item.title}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* ================= Charts ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <Card>
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg text-white">Property Growth</h3>
            <button className="text-xs text-orange-400 border border-orange-500/20 px-3 py-1 rounded-full hover:bg-orange-500/10 transition">
              View Report
            </button>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '12px', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#f97316"
                  strokeWidth={4}
                  dot={{ r: 4, fill: '#1a1a1a', stroke: '#f97316', strokeWidth: 2 }}
                  activeDot={{ r: 6, fill: '#f97316' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Bar Chart */}
        <Card>
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg text-white">Monthly Activity</h3>
            <select className="bg-white/5 border border-white/10 text-xs text-gray-400 rounded-lg px-2 py-1 outline-none">
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                />
                <Tooltip
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '12px', color: '#fff' }}
                />
                <Bar dataKey="value" fill="#fb923c" radius={[6, 6, 6, 6]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* ================= Table ================= */}
      <Card>
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-lg text-white flex items-center gap-2">
            <FaBuilding className="text-orange-500" /> Recent Properties
          </h3>
          <button className="text-sm text-gray-400 hover:text-white transition">See All</button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-gray-500 text-xs uppercase tracking-wider border-b border-white/5">
                <th className="pb-4 pl-2 font-medium">#ID</th>
                <th className="pb-4 font-medium">Property Name</th>
                <th className="pb-4 font-medium">Status</th>
                <th className="pb-4 font-medium">Price</th>
                <th className="pb-4 font-medium text-right pr-2">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {tableData.map((item, index) => (
                <tr key={item.id} className="group hover:bg-white/5 transition-colors border-b border-white/5 last:border-0">
                  <td className="py-4 pl-2 text-gray-500">#{item.id}</td>
                  <td className="py-4 text-white font-medium">{item.name}</td>
                  <td className="py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold border ${item.status === "Sold"
                          ? "bg-green-500/10 text-green-400 border-green-500/20"
                          : item.status === "Pending"
                            ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                            : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                        }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="py-4 text-gray-300 font-mono">{item.price}</td>
                  <td className="py-4 text-right pr-2">
                    <button className="text-gray-500 hover:text-orange-400 transition">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
