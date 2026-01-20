
import { CiLocationOn, CiMail, CiPhone } from "react-icons/ci";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

import usePropertyCountByAgency from "../../../../hooks/usePropertyCountByAgency";
const SingleAgencyCard = ({ item }) => {
  // Handle both direct agency objects and nested agency in properties
  const agency = item.agency || item;
  const agencyName = agency?.agencyName;

  const { data: count = 0 } = usePropertyCountByAgency(item._id);

  return (
    <div className="relative group">
      {/* Glow Effect on Hover */}
      <div className="absolute -inset-1 bg-linear-to-r from-orange-600 to-orange-400 rounded-3xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>

      <div className="relative bg-white/5 border border-white/10 backdrop-blur-xl shadow-xl rounded-3xl overflow-hidden transition-all duration-300">
        <figure className="h-[200px] w-full">
          <div className="relative w-full h-full">
            <img
              src={agency?.logoUrl || "https://via.placeholder.com/300x200"}
              className="w-full h-full object-cover"
              alt={agencyName || "Agency"}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <h1 className="absolute top-3 left-3 text-xs bg-orange-500 text-white font-bold px-3 py-1.5 rounded-full shadow-lg">
              {count} Properties
            </h1>
          </div>
        </figure>
        <div className="p-5">
          <div>
            <Link
              to={`/all-agency/${item._id}`}
              className="text-xl font-bold text-white group-hover:text-orange-400 transition-all duration-300 line-clamp-1"
            >
              {agencyName || "Agency Name"}
            </Link>
            <p className="text-gray-400 text-sm mt-1 line-clamp-1">{agency?.title || ""}</p>
          </div>
          {/* contact */}
          <div className="space-y-2 my-4">
            {agency?.email && (
              <div className="flex items-center text-gray-400 gap-2 text-sm">
                <CiMail className="text-lg text-orange-400" />
                <span className="line-clamp-1">{agency.email}</span>
              </div>
            )}
            <div className="flex items-center text-gray-400 gap-2 text-sm">
              <CiLocationOn className="text-lg text-orange-400" />
              <span className="line-clamp-1">{agency?.location || "Location not specified"}</span>
            </div>
          </div>
          <div className="card-actions justify-end">
            <Link
              to={`/all-agency/${item._id}`}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm transition-all shadow-lg shadow-orange-500/20"
            >
              View Profile
              <FaArrowRightLong />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleAgencyCard;
