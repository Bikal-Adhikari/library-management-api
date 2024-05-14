import express from "express";
const app = express();

const PORT = process.env.PORT || 8000;

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
app.use("/api/v1/users", userRouter);

app.use("*", (req, res, next) => {
  const error = {
    message: "404 page not found",
    errorCode: 404,
  };
  next(error);
});
app.use("/", (req, res) => {
  res.json({
    message: "Server running healthy",
  });
});

//global error handler

app.use((error, req, res, next) => {
  console.log(error);
  const errorCode = error.errorCode || 500;
  res.status(errorCode).json({
    status: "error",
    message: error.message,
  });
});

app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`Server is running at http://localhost:${PORT}`);
});
