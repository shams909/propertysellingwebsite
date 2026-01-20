import React, { useState } from "react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { BsSend } from "react-icons/bs";
import { AuthContext } from "../../../../provider/AuthProvider";
import { addReview } from "../../../../api/reviews.api";
import toast from "react-hot-toast";
import useReviewsByPropertyId from "../../../../hooks/useReviewsByPropertyId";
import { format } from "date-fns";

const ReviewSection = ({ property }) => {
  const { register, handleSubmit, setValue, reset } = useForm();
  const [rating, setRating] = useState(0);
  const { user } = useContext(AuthContext);
  const { data: reviewsByPropertyId = [] , refetch} = useReviewsByPropertyId(
    property?._id,
  );

  const handleRatingChange = (value) => {
    setRating(value);
    setValue("rating", value); // sync with RHF
  };

  const onSubmit = async (data) => {
    // basic validation
    if (!rating || rating === 0) {
      return toast.error("Please select a rating ⭐");
    }

    if (!user) {
      return toast.error("You must be logged in to submit a review");
    }

    const reviewData = {
      comment: data.comment,
      rating,
      name: user.displayName,
      email: user.email,
      userImage: user.photoURL,
      propertyId: property?._id,
      propertyName: property?.propertyName,
      propertyImage: property?.thumbnail,
      propertyStatus: property?.propertyStatus,
      createdAt: new Date(),
    };

    try {
      const res = await addReview(reviewData);

      if (res?.data?.insertedId) {
        toast.success(" Review submitted successfully!");
        reset();
        refetch();
        setRating(0);
      } else {
        toast.error(" Failed to submit review. Please try again.");
      }
    } catch (error) {
      console.error("Review submission error:", error);
      toast.error("🚨 Something went wrong. Try again later.");
    }
  };

  // Mock Reviews (unchanged)
  const reviews = reviewsByPropertyId;

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">
          Client Reviews{" "}
          <span className="text-gray-500 text-lg font-normal">
            ({reviews.length})
          </span>
        </h2>

        {/* Reviews List */}
        <div className="flex flex-col gap-6 mb-12">
          {reviews.map((review) => (
            <div key={review._id} className="flex gap-4">
              <div className="shrink-0">
                <div className="avatar">
                  <div className="w-12 h-12 rounded-full">
                    <img src={review.userImage} alt={review.name} />
                  </div>
                </div>
              </div>

              <div className="w-full">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-sm">{review.name}</span>
                  <span className="text-xs text-gray-500">
                    {review.createdAt
                      ? format(
                          new Date(review.createdAt),
                          "MMM dd, yyyy • h:mm a",
                        )
                      : ""}
                  </span>
                </div>

                <div className="rating rating-xs mb-2 pointer-events-none">
                  {[...Array(5)].map((_, i) => (
                    <input
                      key={i}
                      type="radio"
                      className={`mask mask-star-2 ${
                        i < review.rating ? "bg-orange-500" : "bg-gray-200"
                      }`}
                      checked={i < review.rating}
                      readOnly
                    />
                  ))}
                </div>

                <p className="text-sm text-gray-700">{review.comment}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="divider"></div>

        {/* Write Review */}
        <div className="flex gap-4 mt-10">
          <div className="avatar hidden sm:block">
            <div className="w-12 h-12 rounded-full">
              <img src={user?.photoURL} alt={user?.displayName} />
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="border rounded-2xl bg-gray-50 focus-within:bg-white transition overflow-hidden">
              <div className="flex justify-between items-center px-4 py-3 border-b">
                <span className="text-xs font-bold text-gray-400 uppercase">
                  Select Rating
                </span>

                <div className="rating rating-sm">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <input
                      key={num}
                      type="radio"
                      className="mask mask-star-2 bg-orange-500"
                      checked={rating === num}
                      onChange={() => handleRatingChange(num)}
                    />
                  ))}
                </div>
              </div>

              <textarea
                {...register("comment", { required: true })}
                className="textarea w-full h-32 bg-transparent border-none resize-none px-4 py-3"
                placeholder="Share your experience with this property..."
              />
            </div>

            {/* hidden rating field for RHF */}
            <input type="hidden" {...register("rating")} />

            <div className="flex justify-between items-center mt-3">
              <p className="text-xs text-gray-400">
                Your review will be posted publicly.
              </p>

              <button
                type="submit"
                className="btn btn-sm bg-orange-600 hover:bg-orange-700 text-white px-6"
              >
                <BsSend size={12} />
                Post Review
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
