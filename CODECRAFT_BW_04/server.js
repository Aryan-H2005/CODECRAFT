require("./config/env.js"); // MUST BE FIRST

const express = require("express");
const connectDB = require("./config/db");
const { connectRedis } = require("./config/redis");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(express.json());

connectDB();
connectRedis();

app.use("/users", userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
