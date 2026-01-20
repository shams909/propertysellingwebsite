import FilterSection from "../../../all property/all property components/filter section/FilterSection";

const SidebarContent = () => {
  return (
    <div className="w-80 pt-22 bg-base-100 p-4 space-y-4 overflow-y-auto">
      {/* Contact Agent */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Contact Agent</h2>

        <form className="space-y-3">
          <input
            type="text"
            placeholder="Your Name"
            className="input input-bordered w-full"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="input input-bordered w-full"
          />
          <textarea
            className="textarea textarea-bordered w-full"
            rows="4"
            placeholder="Your Message"
          ></textarea>
          <button className="btn bg-orange-500 text-white w-full">
            Send Message
          </button>
        </form>
      </div>

      {/* Filter */}
      <div className="bg-white p-3 rounded-lg shadow">
        <FilterSection />
      </div>
    </div>
  );
};

export default SidebarContent;
