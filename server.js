import express from "express";
const app = express();

const PORT = process.env.PORT || 8000;

//connect MongoDB
import { connectMongoDB } from "./src/config/mongoConfig.js";
connectMongoDB();

//middlewares
import cors from "cors";
import morgan from "morgan";
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV !== "production") {
  //you can leave this for the prod as well to track the user req
  app.use(morgan("dev"));
}

//routers
import userRouter from "./src/routers/userRouter.js";
import bookRouter from "./src/routers/bookRouter.js";
import burrowRouter from "./src/routers/burrowRouter.js";
import { auth } from "./src/middlewares/auth.js";
import reviewRouter from "./src/routers/reviewRouter.js";
app.use("/api/v1/users", userRouter);
app.use("/api/v1/reviews", reviewRouter);

app.use("/api/v1/books", bookRouter);
app.use("/api/v1/burrows", auth, burrowRouter);

// server status
app.get("/", (req, res) => {
  res.json({
    message: "Server running healthy",
  });
});

app.use("*", (req, res, next) => {
  const err = new Error("404 page not found");
  err.status = 404;
  next(err);
});
//global error handler

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    status: "error",
    message: error.message,
  });
});

app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`Server is running at http://localhost:${PORT}`);
});
