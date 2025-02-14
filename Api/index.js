import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
let port = process.env.PORT;
import connectDB from "./config/connectDB.js";
import userRouter from "./routes/users.js";
import videoRouter from "./routes/videos.js";
import commentRouter from "./routes/comments.js";
import authRouter from "./routes/auth.js";
import cors from "cors";
import uploadRoutes from "./routes/upload.js";
import musicRoute from "./routes/music.js";
import muxRoute from "./routes/mux.js";
import path from "path";

////middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    method: ["GET", "POST", "PUT", "DELETE"],

    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/videos", videoRouter);
app.use("/api/comments", commentRouter);
app.use("/api/auth", authRouter);
app.use("/api/music", musicRoute);
app.use("/api/mux", muxRoute);
///app.use("/api", uploadRoutes);
const __dirname = path.resolve();
if (process.env.NODE === "production") {
  app.use(express.static(path.join(__dirname, "/client/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
  });
}
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "something went wrong";
  return res.status(status).json({ message, status, sucess: false });
});
connectDB();
app.listen(port, () => console.log(`server listening on ${port}`));
