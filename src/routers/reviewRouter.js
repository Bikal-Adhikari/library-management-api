import express from "express";
import { auth, isAdmin } from "../middlewares/auth.js";
import { newReviewValidation } from "../middlewares/joiValidation.js";

import {
  getAllReviews,
  insertReview,
  updateReviewById,
} from "../models/reviews/ReviewModal.js";
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

//return public active reviews
router.get("/", async (req, res, next) => {
  try {
    const reviews = await getAllReviews({ status: "active" });
    return res.json({
      status: "Success",
      message: "",
      reviews,
    });
  } catch (error) {
    next(error);
  }
});
router.get("/all", auth, isAdmin, async (req, res, next) => {
  try {
    const reviews = await getAllReviews();
    return res.json({
      status: "Success",
      message: "",
      reviews,
    });
  } catch (error) {
    next(error);
  }
});
router.patch("/", auth, isAdmin, async (req, res, next) => {
  try {
    const { _id, status } = req.body;
    const review = await updateReviewById(_id, { status });
    review?._id
      ? res.json({
          status: "success",
          message: "Your review has been updated",
        })
      : res.json({
          status: "error",
          message: "Unable to update the review, try again later",
        });
  } catch (error) {
    next(error);
  }
});

export default router;
