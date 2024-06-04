import express from "express";
import { auth } from "../middlewares/auth.js";
import { newReviewValidation } from "../middlewares/joiValidation.js";

import { insertReview } from "../models/reviews/ReviewModal.js";
const router = express.Router();

//create new Book
//private controllers
router.post("/", auth, newReviewValidation, async (req, res, next) => {
  try {
    const review = await insertReview(req.body);
    review?._id
      ? res.json({
          status: "success",
          message: "Your review has been added",
        })
      : res.json({
          status: "error",
          message: "Unable to add the review, try again later",
        });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key")) {
      error.message =
        "Another Book with same ISBN already exist, change your detail and try again";
      error.status = 200;
    }
    next(error);
  }
});

export default router;
