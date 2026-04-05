import express from "express";
import { v4 as uuidv4 } from "uuid";

const app = express();
app.use(express.json());

// In-memory storage
const users = new Map();

// Validation
const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const validateUser = ({ name, email, age }) => {
  if (!name || typeof name !== "string") {
    return "Name is required and must be a string";
  }
  if (!email || !isValidEmail(email)) {
    return "Valid email is required";
  }
  if (age === undefined || typeof age !== "number" || age < 0) {
    return "Age must be a positive number";
  }
  return null;
};

app.get("/", (req, res) => {
  res.send("🚀 Users API is running");
});

// CREATE
app.post("/users", (req, res) => {
  const error = validateUser(req.body);
  if (error) return res.status(400).json({ error });

  const id = uuidv4();
  const user = { id, ...req.body };

  users.set(id, user);
  res.status(201).json(user);
});

// READ ALL
app.get("/users", (req, res) => {
  res.json([...users.values()]);
});

// READ ONE
app.get("/users/:id", (req, res) => {
  const user = users.get(req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });

  res.json(user);
});

// UPDATE
app.put("/users/:id", (req, res) => {
  if (!users.has(req.params.id)) {
    return res.status(404).json({ error: "User not found" });
  }

  const error = validateUser(req.body);
  if (error) return res.status(400).json({ error });

  const updatedUser = { id: req.params.id, ...req.body };
  users.set(req.params.id, updatedUser);

  res.json(updatedUser);
});

// DELETE
app.delete("/users/:id", (req, res) => {
  if (!users.has(req.params.id)) {
    return res.status(404).json({ error: "User not found" });
  }

  users.delete(req.params.id);
  res.status(204).send();
});

// SERVER
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
