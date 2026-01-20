import React from "react";
import RecentlyAddedSection from "../../../all property/all property components/recently added property/RecentlyAddedSection";

const FeaturePropertySidebar = () => {
  return (
    <aside className="space-y-6 sticky top-24">
      <div>
        <h1 className="font-bold text-3xl text-white">Featured Properties</h1>
        <p className="text-gray-400">
          Showing <span className="text-orange-500 font-bold">best featured</span>{" "}
          Properties
        </p>
      </div>

      <div className="divider mt-5 before:bg-white/10 after:bg-white/10" />
      {/* 🔍 Quick Search */}
      <div className="bg-white/5 border border-white/10 backdrop-blur-xl shadow-xl rounded-2xl p-6">
        <h2 className="font-bold text-lg mb-4 text-white">Quick Search</h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Location"
            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-orange-500/50"
          />
          <select className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-orange-500/50">
            <option>Property Type</option>
            <option>Apartment</option>
            <option>House</option>
            <option>Villa</option>
          </select>
          <select className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-orange-500/50">
            <option>Max Price</option>
            <option>$200,000</option>
            <option>$500,000</option>
            <option>$1,000,000+</option>
          </select>

          <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl text-sm font-bold shadow-lg shadow-orange-500/20 transition-all">
            Search
          </button>
        </div>
      </div>

      <RecentlyAddedSection></RecentlyAddedSection>

      {/* 📞 Contact Agent */}
      <div className="bg-white/5 border border-white/10 backdrop-blur-xl shadow-xl rounded-2xl p-6">
        <h2 className="font-bold text-lg mb-4 text-white">Contact Agent</h2>

        <div className="flex items-center gap-4">
          <img
            src="https://i.pravatar.cc/100"
            alt="agent"
            className="w-14 h-14 rounded-full object-cover border-2 border-white/10"
          />
          <div>
            <h3 className="text-sm font-bold text-white">John Doe</h3>
            <p className="text-xs text-gray-400">Senior Property Agent</p>
          </div>
        </div>

        <div className="mt-5 space-y-3 text-sm">
          <p className="text-gray-400 flex items-center gap-2"><span className="text-orange-400">📞</span> +1 234 567 890</p>
          <p className="text-gray-400 flex items-center gap-2"><span className="text-orange-400">✉️</span> agent@example.com</p>
        </div>

        <button className="mt-5 w-full border border-orange-500/50 text-orange-400 hover:bg-orange-500/10 py-3 rounded-xl text-sm font-bold transition-all">
          Send Message
        </button>
      </div>
    </aside>
  );
};

export default FeaturePropertySidebar;
