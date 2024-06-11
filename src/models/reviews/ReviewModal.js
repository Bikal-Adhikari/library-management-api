import ReviewSchema from "./ReviewSchema.js";
import BookSchema from "./ReviewSchema.js";

// insert
export const insertReview = (obj) => {
  return BookSchema(obj).save();
};

// Read all for the admin || public
export const getAllReviews = (filter) => {
  return BookSchema.find(filter);
};

//get book by Id
export const getAReviewById = (_id) => {
  return BookSchema.findById(_id);
};

// Update book by Id
export const updateReviewById = (_id, obj) => {
  return ReviewSchema.findByIdAndUpdate(_id, obj, { new: true });
};

//Delete book by Id
// export const deleteBookById = (_id) => {
//   return BookSchema.findByIdAndDelete(_id);
// };
