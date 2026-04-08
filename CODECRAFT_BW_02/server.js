const express = require("express");
const connectDB = require("./config/db.js");
const dotenv = require("dotenv");

dotenv.config();
connectDB();

const app = express();

app.use(express.json());

//Routes
app.use("/api/users", require("./routes/userRoutes.js"));
app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
