import express from "express";
import { newBurrowValidation } from "../middlewares/joiValidation.js";
import {
  getAllBurrows,
  insertBurrow,
} from "../models/burrowHistory/BurrowModal.js";
import { updateBookById } from "../models/books/BookModal.js";
const router = express.Router();

const maxBurrowingDays = 15;

// create new Burrow history
router.post("/", newBurrowValidation, async (req, res, next) => {
  try {
    const today = new Date();
    const { _id, fName } = req.userInfo;
    const expectedAvailable = today.setDate(
      today.getDate() + maxBurrowingDays,
      "day"
    );
    const burrow = await insertBurrow({
      ...req.body,
      userId: _id,
      userName: fName,
      dueDate: expectedAvailable,
    });

    //if burrow successfull
    //then -> update the book table, isAvailable: false

    if (burrow) {
      await updateBookById(req.body.bookId, {
        isAvailable: false,

        expectedAvailable,
      });

      return res.json({
        status: "success",
        message: "This book now available in your account.",
      });
    }

    res.json({
      status: "error",
      message: "Unable to burrow the book, try agian later",
    });
  } catch (error) {
    next(error);
  }
});
router.get("/", async (req, res, next) => {
  try {
    const { _id, role } = req.userInfo;
    const burrows = (await getAllBurrows({ userId: _id })) || [];

    res.json({
      status: "success",
      message: "",
      burrows,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
