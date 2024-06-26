import express from "express";
import { auth, isAdmin } from "../middlewares/auth.js";
import {
  editBookValidation,
  newBookValidation,
} from "../middlewares/joiValidation.js";
import {
  getABookById,
  getAllBooks,
  insertBook,
  updateBookById,
} from "../models/books/BookModal.js";
const router = express.Router();

//create new Book
//private controllers
router.post("/", auth, isAdmin, newBookValidation, async (req, res, next) => {
  try {
    const book = await insertBook(req.body);
    book?._id
      ? res.json({
          status: "success",
          message: "Book added successfully",
        })
      : res.json({
          status: "error",
          message: "Unable to add new book, try again later",
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

router.get("/all", auth, isAdmin, async (req, res, next) => {
  try {
    // get all active books
    const books = await getAllBooks();
    res.json({ status: "success", books });
  } catch (error) {
    next(error);
  }
});

router.put("/", auth, isAdmin, editBookValidation, async (req, res, next) => {
  try {
    const { _id, ...rest } = req.body;
    const update = await updateBookById(_id, rest);
    update?._id
      ? res.json({
          status: "success",
          message: "Book edit successfully",
        })
      : res.json({
          status: "error",
          message: "Unable to edit book, try again later",
        });
  } catch (error) {
    next(error);
  }
});

// public controllers

router.get("/:_id?", async (req, res, next) => {
  try {
    const { _id } = req.params;
    // get all active books
    const books = _id
      ? await getABookById(_id)
      : await getAllBooks({ status: "active" });
    res.json({ status: "success", books });
  } catch (error) {
    next(error);
  }
});

export default router;
