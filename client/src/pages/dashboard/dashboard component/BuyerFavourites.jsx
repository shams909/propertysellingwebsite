import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import useFavourites from "../../../hooks/useFavourites";
import { AuthContext } from "../../../provider/AuthProvider";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { FaBed, FaBath, FaRulerCombined } from "react-icons/fa";


import { deleteFromFavourite } from "../../../api/properties.api";
import Swal from "sweetalert2";
import Loading from "../../../component/loading/Loading";

const BuyerFavourites = () => {
  const { user } = useContext(AuthContext);
  const {
    data: favourites = [],
    isLoading,
    refetch,
  } = useFavourites(user?.email);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  const handleRemoveFavourite = async (propertyId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This property will be removed from your favourites!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove it",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      await deleteFromFavourite({
        propertyId: propertyId,
        email: user?.email,
      }).then((res) => {
        if (res.data.deletedCount > 0) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Removed!",
            text: "Property removed from favourites.",
            showConfirmButton: false,
            timer: 1500,
          });
          refetch();
        }
      });
    }
  };

   if (isLoading) {
    return Loading();
  }

  if (favourites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96 bg-base-100 rounded-lg">
        <MdFavoriteBorder className="text-6xl text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-500 mb-2">
          No Favorites Yet
        </h2>
        <p className="text-gray-400 mb-6">
          Start adding properties to your favorites
        </p>
        <Link to="/all-property" className="btn btn-orange">
          Browse Properties
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          My Favorite Properties
        </h1>
        <p className="text-gray-600 mt-2">
          You have {favourites.length} favorite
          {favourites.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favourites.map((property) => (
          // Property Card
          <div
            key={property._id}
            className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            {/* Image Container */}
            <div className="relative h-48 bg-gray-200 overflow-hidden group">
              <img
                src={property.thumbnail || "/default-property.jpg"}
                alt={property.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />

              {/* Price Badge */}
              <div className="absolute top-3 right-3 bg-orange-500 text-white px-4 py-2 rounded-full font-bold text-lg">
                ${property.price?.toLocaleString()}
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              {/* Title */}
              <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                {property.title}
              </h3>

              {/* Location */}
              <p className="text-xl font-bold text-gray-600 mb-4 flex items-center gap-1">
                {property.propertyName || "Location not specified"}
              </p>

              {/* Property Details */}
              <div className="grid grid-cols-3 gap-3 mb-4 pb-4 border-b border-gray-200">
                {property.details?.bedrooms && (
                  <div className="flex flex-col items-center">
                    <FaBed className="text-orange-500 text-lg mb-1" />
                    <span className="text-xs font-semibold text-gray-700">
                      {property.details.bedrooms}
                    </span>
                    <span className="text-xs text-gray-500">Beds</span>
                  </div>
                )}

                {property.details?.bathrooms && (
                  <div className="flex flex-col items-center">
                    <FaBath className="text-blue-500 text-lg mb-1" />
                    <span className="text-xs font-semibold text-gray-700">
                      {property.details.bathrooms}
                    </span>
                    <span className="text-xs text-gray-500">Baths</span>
                  </div>
                )}

                {property.details?.squareFeet && (
                  <div className="flex flex-col items-center">
                    <FaRulerCombined className="text-green-500 text-lg mb-1" />
                    <span className="text-xs font-semibold text-gray-700">
                      {property.details.squareFeet}
                    </span>
                    <span className="text-xs text-gray-500">Sqft</span>
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {property.description || "No description available"}
              </p>

              {/* Agency Info */}
              {property.agencyName && (
                <p className="text-xs text-gray-500 mb-4">
                  By{" "}
                  <span className="font-semibold text-gray-700">
                    {property.agencyName}
                  </span>
                </p>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Link
                  to={`/all-property/${property.propertyId}`}
                  className="flex-1 btn btn-outline btn-sm btn-orange"
                >
                  View Details
                </Link>
                <button
                  onClick={() => handleRemoveFavourite(property.propertyId)}
                  className="btn btn-ghost btn-sm btn-error"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuyerFavourites;
