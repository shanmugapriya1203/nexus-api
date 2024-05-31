import express from "express";
import http from "http";
import { Server } from "socket.io";
import connectDB from "./db.js";
import cors from "cors";
import { config as dotenvConfig } from "dotenv";
import authRoutes from "./routes/authRoute.js";
import userRoutes from "./routes/userRoute.js";
import shelterRoutes from "./routes/shelterRoute.js";
import volunteerRoutes from "./routes/volunteerRoute.js";
import planRoutes from "./routes/planRoute.js";
import incidentRoutes from "./routes/incidentRoute.js";
import alertRoutes from "./routes/alertRoute.js";
import postRoutes from "./routes/postRoute.js";
import stripeRoutes from "./routes/stripeRoute.js";
import supplyRoutes from "./routes/donationRoute.js";
import hospitalRoutes from "./routes/hospitalRoute.js";
import responerRoutes from "./routes/responderRoute.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

dotenvConfig();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(
  cors({
    credentials: true,
  })
);
app.use(express.json({ urlencoded: true }));
app.use(bodyParser.json());
app.use(cookieParser());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/shelter", shelterRoutes);
app.use("/api/volunteers", volunteerRoutes);
app.use("/api/plans", planRoutes);
app.use("/api/incident", incidentRoutes);
app.use("/api/alerts", alertRoutes);
app.use("/api/threads", postRoutes);
app.use("/api/stripe", stripeRoutes);
app.use("/api/donations", supplyRoutes);
app.use("/api/hospital", hospitalRoutes);
app.use("/api/responder", responerRoutes);
io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
