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
      title: '<span style="color:white; font-weight:bold; font-size: 1.5rem;">Remove Favorite?</span>',
      html: '<p style="color:#a1a1aa; font-size: 0.95rem;">Are you sure you want to remove this property from your favorites?</p>',
      icon: "warning",
      iconColor: "#ef4444",
      background: "rgba(20, 20, 20, 0.45)", // Semi-transparent dark
      background: "rgba(20, 20, 20, 0.45)",
      backdrop: `rgba(0,0,0,0.6)`,
      showCancelButton: true,
      confirmButtonText: "Remove",
      cancelButtonText: "Cancel",
      customClass: {
        popup: "border border-white/10 !rounded-[2.5rem] shadow-2xl backdrop-blur-xl",
        confirmButton: "bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-red-500/20 transition-all transform hover:scale-105",
        cancelButton: "bg-white/5 hover:bg-white/10 text-white px-8 py-3 rounded-full font-bold transition-all border border-white/10 hover:border-white/20",
        actions: "gap-6 !mt-6",
        title: "!text-2xl !font-bold !text-white",
        htmlContainer: "!text-gray-400 !text-sm",
      },
      buttonsStyling: false,
    });

    if (result.isConfirmed) {
      await deleteFromFavourite({
        propertyId: propertyId,
        email: user?.email,
      }).then((res) => {
        if (res.data.deletedCount > 0) {
          Swal.fire({
            title: 'Removed!',
            text: 'The property has been removed.',
            icon: "success",
            iconColor: "#22c55e",
            background: "rgba(20, 20, 20, 0.45)",
            backdrop: `rgba(0,0,0,0.6) backdrop-filter: blur(4px)`,
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: "border border-white/10 !rounded-[2.5rem] shadow-2xl backdrop-blur-xl",
              title: "!text-white !font-bold",
              htmlContainer: "!text-gray-400",
            },
            buttonsStyling: false,
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
      <div className="flex flex-col items-center justify-center h-96 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-md text-center p-6">
        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
          <MdFavoriteBorder className="text-4xl text-gray-500" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">
          No Favorites Yet
        </h2>
        <p className="text-gray-400 mb-8 max-w-sm">
          Start adding properties to your favorites list to keep track of your dream homes.
        </p>
        <Link to="/all-property" className="btn bg-orange-500 hover:bg-orange-600 text-white border-none rounded-full px-8 shadow-lg shadow-orange-500/20">
          Browse Properties
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8 flex flex-col md:flex-row justify-between items-end border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            My Favorite Properties
          </h1>
          <p className="text-gray-400">
            You have saved <span className="text-orange-500 font-bold">{favourites.length}</span> property
            {favourites.length !== 1 ? "s" : ""}.
          </p>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {favourites.map((property) => (
          // Property Card
          <div
            key={property._id}
            className="bg-[#0f0f0f] border border-white/5 rounded-3xl overflow-hidden shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 hover:-translate-y-2 group flex flex-col h-full relative"
          >

            {/* Image Container */}
            <div className="relative h-64 overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-t from-[#0f0f0f] via-transparent to-transparent z-10 opacity-80" />
              <div className="absolute top-4 left-4 z-20">
                <span className="bg-white/10 backdrop-blur-xl border border-white/10 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                  {property.propertyStatus || "For Sale"}
                </span>
              </div>

              <button
                onClick={() => handleRemoveFavourite(property.propertyId)}
                className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center bg-red-500/20 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-all duration-300 backdrop-blur-md"
                title="Remove from favorites"
              >
                <MdFavoriteBorder className="text-lg" />
              </button>

              <img
                src={property.thumbnail || "/default-property.jpg"}
                alt={property.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>

            {/* Content */}
            <div className="p-6 pt-0 flex flex-col grow relative z-20">

              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1 line-clamp-1 group-hover:text-orange-500 transition-colors">
                    {property.title}
                  </h3>
                  <p className="text-sm font-medium text-gray-500 flex items-center gap-1 line-clamp-1">
                    {property.propertyName || "Location not specified"}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <span className="text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-orange-600">
                  ${property.price?.toLocaleString()}
                </span>
              </div>

              {/* Specs Grid - Organized */}
              <div className="grid grid-cols-3 gap-2 mb-6">
                <div className="bg-white/5 rounded-xl p-3 flex flex-col items-center justify-center border border-white/5 hover:border-orange-500/30 transition-colors">
                  <FaBed className="text-orange-500 text-lg mb-1" />
                  <span className="text-sm font-bold text-white">{property.details?.beds || 0}</span>
                  <span className="text-[10px] text-gray-500 uppercase font-semibold">Beds</span>
                </div>
                <div className="bg-white/5 rounded-xl p-3 flex flex-col items-center justify-center border border-white/5 hover:border-orange-500/30 transition-colors">
                  <FaBath className="text-orange-500 text-lg mb-1" />
                  <span className="text-sm font-bold text-white">{property.details?.baths || 0}</span>
                  <span className="text-[10px] text-gray-500 uppercase font-semibold">Baths</span>
                </div>
                <div className="bg-white/5 rounded-xl p-3 flex flex-col items-center justify-center border border-white/5 hover:border-orange-500/30 transition-colors">
                  <FaRulerCombined className="text-orange-500 text-lg mb-1" />
                  <span className="text-sm font-bold text-white">{property.details?.area || 0}</span>
                  <span className="text-[10px] text-gray-500 uppercase font-semibold">Sqft</span>
                </div>
              </div>

              <div className="mt-auto">
                <Link
                  to={`/all-property/${property.propertyId}`}
                  className="w-full btn bg-orange-600 hover:bg-orange-500 text-white border-none rounded-xl font-bold tracking-wide shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 transition-all h-12 min-h-0 normal-case"
                >
                  View Property Details
                </Link>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuyerFavourites;
