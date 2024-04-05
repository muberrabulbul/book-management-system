// index.js

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
const userRoutes = require("./src/routes/userRoutes");
app.use("/users", userRoutes);

const bookRoutes = require("./src/routes/bookRoutes");
app.use("/books", bookRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
