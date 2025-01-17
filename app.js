const express = require('express');

const cors = require('cors'); 
const app = express();
const multer = require('multer');
const port = 1010;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./Routes/Models/userModel');
const mongoURI = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;
const dbURl = mongoURI + '/' + dbName;

const upload = multer();

mongoose.connect(dbURl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

app.use(cors());

// routes

const registerUser = require('./Routes/Auth/RegisterUser');
const Login = require('./Routes/Auth/Login');
const updateUser = require('./Routes/Auth/updateUser');
const UpdatePassword = require('./Routes/Auth/updatePassword');
const product = require('./Routes/Product/Product');

const addComment = require('./Routes/Comment/AddComment');
const getComment = require('./Routes/Comment/GetCommentByProductId');
const getCommentById =  require('./Routes/Product/GetProductById');


app.use('/register', registerUser)
app.use('/login', Login);
app.use('/updateUser', updateUser);
app.use('/updatePassword', UpdatePassword);
app.use('/product', product);
app.use('/product', getCommentById);
app.use('/comment',addComment);
app.use('/comment',getComment);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
