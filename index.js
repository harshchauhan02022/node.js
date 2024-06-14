// index.js
const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes'); // Correct import path
const connection = require('./config/db');

dotenv.config();

const app = express();
const port = process.env.PORT || 9000;

app.use(express.json());

app.use("/api/users", userRoutes);

app.listen(port, () => {
 console.log(`Server running at http://localhost:${port}`);
});
