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

app.use("/api/v1", (req, res) => {
  res.json({
    message: "Server running healthy",
  });
});

//global error handler

app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`Server is running at http://localhost:${PORT}`);
});
