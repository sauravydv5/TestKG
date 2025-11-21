const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { DBConnection } = require("./src/config/Database");

const userRoutes = require("./src/routes/userRoutes");
const protectedRoutes = require("./src/routes/protectedRoutes");
const adminRoutes = require("./src/routes/adminRoutes");

const app = express();

// Middleware
app.use(
  cors({
    origin: ["http://localhost:5173", "https://kgfoundation.netlify.app"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", userRoutes);
app.use("/api", protectedRoutes);
app.use("/api/admin", adminRoutes); // admin dashboard stats route

// Test route
app.get("/", (req, res) => res.send("Hello Server Running"));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  await DBConnection();
});
