import express from "express";

import { newBurrowValidation } from "../middlewares/joiValidation.js";

import { insertBurrow } from "../models/burrowHistory/BurrowModal.js";
import { updateBookById } from "../models/books/BookModal.js";
const router = express.Router();

const maxBurrowingDays = 15;
//create new Burrow

router.post("/", newBurrowValidation, async (req, res, next) => {
  try {
    const today = new Date();
    const { _id, fName } = req.userInfo;
    const burrow = await insertBurrow({
      ...req.body,
      userId: _id,
      userName: fName,
    });

    if (burrow) {
      await updateBookById(
        req.body.bookId,
        { isAvailable: false },
        {
          expectedAvailable: today.setDate(
            today.getDate() + maxBurrowingDays,
            "day"
          ),
        }
      );
      return res.json({
        status: "success",
        message: "This book is now available in your account",
      });
    }

    res.json({
      status: "error",
      message: "Unable to add new book, try again later",
    });
  } catch (error) {
    next(error);
  }
});

export default router;
