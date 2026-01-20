import React from "react";
import RecentlyAddedSection from "../../../all property/all property components/recently added property/RecentlyAddedSection";

const FeaturePropertySidebar = () => {
  return (
    <aside className="space-y-6  sticky top-24">
      <div>
        <h1 className="font-bold text-3xl">Featured Properties</h1>
        <p className="text-gray-500">
          Showing <span className="text-orange-500">best featured</span>{" "}
          Properties
        </p>
      </div>

      <div className="divider mt-5" />
      {/* 🔍 Quick Search */}
      <div className="bg-white shadow-xl rounded-xl p-4">
        <h2 className="font-semibold text-lg mb-3">Quick Search</h2>

        <div className="space-y-3">
          <input
            type="text"
            placeholder="Location"
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-400"
          />
          <select className="w-full border rounded-lg px-3 py-2 text-sm">
            <option>Property Type</option>
            <option>Apartment</option>
            <option>House</option>
            <option>Villa</option>
          </select>
          <select className="w-full border rounded-lg px-3 py-2 text-sm">
            <option>Max Price</option>
            <option>$200,000</option>
            <option>$500,000</option>
            <option>$1,000,000+</option>
          </select>

          <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg text-sm font-medium">
            Search
          </button>
        </div>
      </div>

      <RecentlyAddedSection></RecentlyAddedSection>

      {/* 📞 Contact Agent */}
      <div className="bg-white shadow-xl rounded-xl p-4">
        <h2 className="font-semibold text-lg mb-3">Contact Agent</h2>

        <div className="flex items-center gap-3">
          <img
            src="https://i.pravatar.cc/100"
            alt="agent"
            className="w-14 h-14 rounded-full object-cover"
          />
          <div>
            <h3 className="text-sm font-semibold">John Doe</h3>
            <p className="text-xs text-gray-500">Senior Property Agent</p>
          </div>
        </div>

        <div className="mt-4 space-y-2 text-sm">
          <p className="text-gray-600">📞 +1 234 567 890</p>
          <p className="text-gray-600">✉️ agent@example.com</p>
        </div>

        <button className="mt-4 w-full border border-orange-500 text-orange-500 hover:bg-orange-50 py-2 rounded-lg text-sm font-medium">
          Send Message
        </button>
      </div>
    </aside>
  );
};

export default FeaturePropertySidebar;
