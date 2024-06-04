import express from "express";
import { newBurrowValidation } from "../middlewares/joiValidation.js";
import {
  getAllBurrows,
  insertBurrow,
  updateBurrowById,
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
    const filter = role === "admin" ? null : { userId: _id };
    const burrows = (await getAllBurrows(filter)) || [];

    res.json({
      status: "success",
      message: "",
      burrows,
    });
  } catch (error) {
    next(error);
  }
});
router.put("/", async (req, res, next) => {
  try {
    if (!req.body._id || !req.body.bookId) {
      throw new Error("Invalid data");
    }
    // update burrow table

    const burrow = await updateBurrowById(req.body._id, {
      isReturned: true,
      returnedDate: Date(),
    });

    //update book table

    const book = await updateBookById(req.body.bookId, {
      isAvailable: true,
      expectedAvailable: null,
    });

    if (burrow?._id && book?._id) {
      return res.json({
        status: "Success",
        message: "You have sucessfully returned the book",
      });
    }
    res.json({
      status: "error",
      message: "Invalid data, please try again",
    });
  } catch (error) {
    next(error);
  }
});

export default router;
