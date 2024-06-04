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

//Update book by Id
// export const updateBookById = (_id, obj) => {
//   return BookSchema.findByIdAndUpdate(_id, obj, { new: true });
// };

//Delete book by Id
// export const deleteBookById = (_id) => {
//   return BookSchema.findByIdAndDelete(_id);
// };
