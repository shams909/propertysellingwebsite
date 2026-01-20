import React, { useContext, useState } from "react";
import { CiCamera, CiHeart } from "react-icons/ci";
import { IoIosGitCompare } from "react-icons/io";
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
    <div className="card bg-base-100 shadow-sm group">
      <figure>
        <div className="relative">
          <img src={thumbnail} alt={propertyName} />

          {/* Status */}
          <div className="absolute top-3 left-3 bg-red-600 px-4 text-xs py-1 text-white font-semibold rounded-lg">
            {propertyStatus}
          </div>

          {/* Views */}
          <div className="absolute top-3 right-3 bg-gray-600 px-4 text-xs py-1 text-white font-semibold rounded-lg flex items-center gap-1">
            <CiCamera /> {views}
          </div>


          {/* Favourite */}
          <button
            onClick={handleFavourite}
            disabled={loading}
            className={`absolute bottom-3 right-3 p-2 rounded-lg text-xl
              transition-all duration-300
              ${
                isFav
                  ? "bg-red-500 text-white"
                  : "bg-white text-black"
              }
              ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
            `}
          >
            {isFav ? <FaHeart /> : <CiHeart />}
          </button>
        </div>
      </figure>

      <div className="card-body justify-between">
        <div className="space-y-2">
          <Link
            to={`/all-property/${_id}`}
            className="text-2xl font-bold group-hover:text-orange-500 transition-all duration-300"
          >
            {propertyName}
          </Link>

          <p className="text-xl font-semibold text-orange-500">
            ${price}*
          </p>

          <p className="text-gray-600">
            {description
              ? description.slice(0, 100)
              : "No description available"}
          </p>
        </div>

        {/* Icons */}
        <div className="flex justify-between mt-4">
          <div className="flex items-center gap-1 font-semibold text-gray-600">
            <IoBedOutline />
            <p>Bed: {details?.beds}</p>
          </div>
          <div className="flex items-center gap-1 font-semibold text-gray-600">
            <LiaBathSolid />
            <p>Baths: {details?.baths}</p>
          </div>
          <div className="flex items-center gap-1 font-semibold text-gray-600">
            <GiThermometerScale />
            <p>Sq Ft: {details?.area}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center mt-5">
          <h1 className="text-gray-600 font-semibold">
            {formattedDate}
          </h1>
          <Link
            to={`/all-property/${_id}`}
            className="btn rounded-full bg-orange-500 hover:bg-white hover:text-black text-white"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SinglePropertyCard;
