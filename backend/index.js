import "dotenv/config";
import express from "express"; // Handles server requests and responses
import cookieParser from "cookie-parser";
import connectToDB from "./config/mongodb.js";
import { PORT } from "./constants/env.const.js";
import { OK } from "./constants/http.codes.js";
import authRouter from "./routes/authRouter.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";
import userRouter from "./routes/userRouter.js";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Testing route
app.get("/", (req, res) => {
  res.status(OK).json({
    status: "success",
  });
});

// API routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);

// Error handling
app.use(notFound);
app.use(errorHandler);

// Start the server
app.listen(PORT, async () => {
  console.log(`Connected at PORT : ${PORT}`);
  await connectToDB();
});
