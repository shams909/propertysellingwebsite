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
  const { data: reviewsByPropertyId = [], refetch } = useReviewsByPropertyId(
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
    <section className="py-12 bg-white/5 border border-white/5 backdrop-blur-md rounded-3xl mt-8">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="text-2xl font-bold text-white mb-8 border-b border-white/10 pb-4">
          Client Reviews{" "}
          <span className="text-orange-500 text-lg font-normal ml-2">
            ({reviews.length})
          </span>
        </h2>

        {/* Reviews List */}
        <div className="flex flex-col gap-6 mb-12">
          {reviews.map((review) => (
            <div key={review._id} className="flex gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5">
              <div className="shrink-0">
                <div className="avatar">
                  <div className="w-12 h-12 rounded-full ring ring-orange-500 ring-offset-base-100 ring-offset-2">
                    <img src={review.userImage} alt={review.name} className="rounded-full" />
                  </div>
                </div>
              </div>

              <div className="w-full">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-sm text-white">{review.name}</span>
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
                      className={`mask mask-star-2 ${i < review.rating ? "bg-orange-500" : "bg-gray-700"
                        }`}
                      checked={i < review.rating}
                      readOnly
                    />
                  ))}
                </div>

                <p className="text-sm text-gray-300 leading-relaxed italic">"{review.comment}"</p>
              </div>
            </div>
          ))}
        </div>

        <div className="divider before:bg-white/10 after:bg-white/10"></div>

        {/* Write Review */}
        <div className="flex gap-4 mt-10">
          <div className="avatar hidden sm:block">
            <div className="w-12 h-12 rounded-full ring ring-orange-500/50">
              <img src={user?.photoURL} alt={user?.displayName} className="rounded-full" />
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="border border-white/10 rounded-2xl bg-[#0a0a0a] focus-within:border-orange-500/50 transition overflow-hidden">
              <div className="flex justify-between items-center px-4 py-3 border-b border-white/10 bg-white/5">
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
                className="textarea w-full h-32 bg-transparent border-none resize-none px-4 py-3 text-white placeholder-gray-600 focus:outline-none"
                placeholder="Share your experience with this property..."
              />
            </div>

            {/* hidden rating field for RHF */}
            <input type="hidden" {...register("rating")} />

            <div className="flex justify-between items-center mt-4">
              <p className="text-xs text-gray-500">
                Your review will be posted publicly.
              </p>

              <button
                type="submit"
                className="btn btn-sm bg-orange-600 hover:bg-orange-700 text-white px-6 border-none rounded-full shadow-lg shadow-orange-600/20"
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
