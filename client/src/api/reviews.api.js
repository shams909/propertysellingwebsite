import axiosSecure from "../axios/axiosSecure";

export const addReview = (reviewData) => {
  return axiosSecure.post("/reviews", reviewData);
};

export const fetchReviewsByPropertyId = (propertyId) => {
  return axiosSecure.get(`/reviews/property/${propertyId}`);
}