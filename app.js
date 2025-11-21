const express = require("express");
const { pool, DBConnection } = require("./src/config/Database");
const app = express();

app.use(express.json());

const userRoutes = require("./src/routes/userRoutes");
app.use("/api/auth", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello Server Running");
});

app.listen(3000, async () => {
  console.log("🚀 Server is running on port 3000");
  await DBConnection();
});
