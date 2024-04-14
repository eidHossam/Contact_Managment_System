const express = require("express");
const dotenv = require("dotenv").config();
const contacts = require("./routes/contactRoutes");
const users = require("./routes/userRoutes");
const errorHandler = require("./middleware/errorHandler");

const port = process.env.PORT;

const app = express();

app.use(express.json());
app.use("/api/contacts", contacts);
app.use("/api/users", users);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
