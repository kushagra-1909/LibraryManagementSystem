const express = require("express");
const app = express();
const cors=require('cors');

const authMiddleware = require("./middlewares/authMiddleware");
app.use(express.json());
app.use(cors());

const usersRoute = require("./routes/usersRoute");
const booksRoute = require("./routes/booksRoute");
const issuesRoute = require("./routes/issuesRoute");
const reportsRoute = require("./routes/reportsRoute");

app.use("/api/users", usersRoute);
app.use("/api/books", booksRoute);
app.use("/api/issues", issuesRoute);
app.use("/api/reports", reportsRoute);

app.use(authMiddleware);

module.exports = app;
