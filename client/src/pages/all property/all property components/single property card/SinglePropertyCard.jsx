import React, { useContext, useState } from "react";
import { CiCamera, CiHeart } from "react-icons/ci";
import { format } from "date-fns";
import { IoBedOutline } from "react-icons/io5";
import { LiaBathSolid } from "react-icons/lia";
import { GiThermometerScale } from "react-icons/gi";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../../provider/AuthProvider";
import {
  addInFavourite,
  deleteFromFavourite,
} from "../../../../api/properties.api";
import toast from "react-hot-toast";
import { FaHeart } from "react-icons/fa";
import useFavourites from "../../../../hooks/useFavourites";

const SinglePropertyCard = ({ property }) => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const {
    _id,
    propertyName,
    price,
    propertyStatus,
    thumbnail,
    details,
    createdAt,
    createAt,
    views,
    description,
  } = property;

  /* ---------- GET FAVOURITES FROM DB ---------- */
  const { data: favourites = [], refetch } = useFavourites(user?.email);

  const isFav = favourites.some(
    (fav) => fav.propertyId === _id
  );

  /* ---------- DATE FORMAT ---------- */
  const dateValue = createdAt || createAt;
  let formattedDate = "Date not available";

  if (dateValue) {
    const date = new Date(dateValue);
    if (!isNaN(date.getTime())) {
      formattedDate = format(date, "dd MMMM, yyyy");
    }
  }

  /* ---------- FAVOURITE HANDLER ---------- */
  const handleFavourite = async () => {
    if (!user) {
      return toast.error("Please login first");
    }

    setLoading(true);

    try {
      if (!isFav) {
        await addInFavourite({
          propertyId: _id,
          propertyName,
          price,
          thumbnail,
          propertyStatus, // Send status
          details, // Send details object
          email: user.email,
        });

        toast.success("Added to favourite");
      } else {
        await deleteFromFavourite({
          propertyId: _id,
          email: user.email,
        });

        toast.success("Removed from favourite");
      }

      refetch();
    } catch (error) {
      console.error("Favourite error:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card bg-white/5 border border-white/10 shadow-xl group hover:shadow-orange-500/10 transition-all duration-300 backdrop-blur-md rounded-3xl overflow-hidden h-full flex flex-col justify-between">
      <figure className="relative h-64 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent z-10 pointer-events-none" />
        <img src={thumbnail} alt={propertyName} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />

        {/* Status */}
        <div className="absolute top-4 left-4 z-20">
          <span className="bg-orange-500/90 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider backdrop-blur-md shadow-lg">
            {propertyStatus}
          </span>
        </div>

        {/* Views */}
        <div className="absolute top-4 right-4 z-20 bg-black/40 text-white px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-md border border-white/10 flex items-center gap-1.5">
          <CiCamera className="text-lg" /> {views}
        </div>

        {/* Favourite */}
        <button
          onClick={handleFavourite}
          disabled={loading}
          className={`absolute bottom-4 right-4 z-20 p-2.5 rounded-full text-lg transition-all duration-300 shadow-lg active:scale-95
            ${isFav ? "bg-red-500 text-white" : "bg-white/10 text-white hover:bg-white/20 backdrop-blur-md border border-white/20"}
          `}
        >
          {isFav ? <FaHeart /> : <CiHeart />}
        </button>
      </figure>

      <div className="p-6 flex flex-col grow">
        <div className="space-y-3 grow">
          <div className="flex justify-between items-start">
            <Link
              to={`/all-property/${_id}`}
              className="text-xl font-bold text-white group-hover:text-orange-500 transition-colors line-clamp-1"
              title={propertyName}
            >
              {propertyName}
            </Link>
          </div>

          <p className="text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-orange-600">
            ${price.toLocaleString()}
          </p>

          <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed h-10">
            {description ? description : "No description available"}
          </p>
        </div>

        {/* Icons */}
        <div className="flex justify-between items-center py-4 border-y border-white/5 mt-4 mb-4">
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <IoBedOutline className="text-lg text-orange-500" />
            <span>{details?.beds} Beds</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <LiaBathSolid className="text-lg text-orange-500" />
            <span>{details?.baths} Baths</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <GiThermometerScale className="text-lg text-orange-500" />
            <span>{details?.area} ft²</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center pt-1">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-gray-500 text-xs font-medium uppercase tracking-wide">{formattedDate}</span>
          </div>

          <Link
            to={`/all-property/${_id}`}
            className="px-5 py-2 rounded-full bg-white/10 hover:bg-orange-500 text-white text-sm font-semibold transition-all border border-white/10 hover:border-orange-500/50 hover:shadow-lg hover:shadow-orange-500/20 backdrop-blur-md"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SinglePropertyCard;
