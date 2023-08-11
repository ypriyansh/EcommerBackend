// app.js

const express = require('express');
const mongoose = require('mongoose');

// Create an instance of the Express application
const app = express();
// MongoDB connection URI
const dbURI = 'mongodb://localhost:27017/EcomDb'; // Replace 'my_database' with your actual database name

// Mongoose connection options
const mongooseOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
};


app.use(express.json());

// Connect to MongoDB
mongoose
        .connect(dbURI, mongooseOptions)
        .then(() => {
                console.log('Connected to MongoDB');
        })
        .catch((err) => {
                console.error('Error connecting to MongoDB:', err);
        });

// routes 
const UserRoutes = require("./routes/user")
const addRoutes = require("./routes/address");
const catRoutes = require("./routes/category");
const proRoutes = require("./routes/product")
const userCartRoutes = require("./routes/cart")
const orderRoutes = require("./routes/order")

app.use("/user", [UserRoutes])
app.use("/address", [addRoutes]);
app.use("/category",[catRoutes]);
app.use("/product",[proRoutes]);
app.use("/cart",[userCartRoutes]);
app.use("/order",[orderRoutes]);

// Start the server
const port = 3000;
app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
});
