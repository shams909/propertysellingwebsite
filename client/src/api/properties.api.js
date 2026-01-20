import axiosSecure from "../axios/axiosSecure";

export const fetchProperties = async (filters) => {
  return axiosSecure.get("/allProperties", {
    params: filters,
  });
};

export const fetchAllProperties = () => {
  return axiosSecure.get("/admin/allProperties");
};

export const fetchPropertyById = (id) => {
  return axiosSecure.get(`/allProperties/${id}`);
};

export const fetchPropertyByAgencyId = (agencyId) => {
  return axiosSecure.get(`/allProperties/agency/${agencyId}`);
};

export const fetchPropertyType = () => {
  return axiosSecure.get("/properties/types");
};

export const fetchPropertyCountByAgency = (agencyId) => {
  return axiosSecure.get(`/properties/countProperty`, {
    params: { agencyId },
  });
};
export const fetchPropertyCountByPropertyId = (propertyId) => {
  return axiosSecure.get(`/properties/countByPropertyId`, {
    params: { propertyId },
  });
}

export const fetchPropertyByEmail = async (email) => {
  return axiosSecure.get(`/allProperties/user/${email}`);
};

export const addProperty = async (propertyData) => {
  return axiosSecure.post(`/properties`, propertyData);
};

export const getFavourites = (email) => {
  return axiosSecure.get(`/favourites?email=${email}`);
};

export const addInFavourite = (data) => {
  return axiosSecure.post("/favourites", data);
};

export const deleteFromFavourite = (data) => {
  return axiosSecure.delete("/favourites", { data });
};

export const approveProperty = (id) => {
  return axiosSecure.patch(`/properties/approve/${id}`);
};
export const pendingProperty = (id) => {
  return axiosSecure.patch(`/properties/pending/${id}`);
};
export const rejectProperty = (id) => {
  return axiosSecure.patch(`/properties/reject/${id}`);
};
export const deleteProperty = (id) => {
  return axiosSecure.delete(`/properties/delete/${id}`);
};

export const changePropertyStatus = (id, status) => {
  return axiosSecure.patch(`/properties/status/${id}`, status);
}
