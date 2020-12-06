require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routes/userRoutes")
const noteRouter = require("./routes/noteRoutes");

const app = express();
app.use(express.json());
app.use(cors());

//Routes
app.use('/users', userRouter );
app.use('/api/notes', noteRouter );

app.get('/', (req, res) => {
    res.json("Hello notes app");
});

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log("Server is running on port", PORT)
});


//Connect to MongoDB
const URI = process.env.MONGODB_URL;
mongoose.connect(URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if(err) throw err;
    console.log("Connected to MongoDB");
});