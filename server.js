const express = require('express');
const connectDB = require('./src/config/db');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const cors = require("cors");
const path = require('path');

dotenv.config();
const app = express();

const server = require('http').createServer(app);

const courseRouter = require('./src/routes/courseRoutes');
const contactRouter = require('./src/routes/contactRoutes');

var corsOptions = {
  origin: 'http://localhost:5173',  
  credentials: true 
};

// CORS middleware setup
app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');  
  res.header('Access-Control-Allow-Credentials', true);  
  next();
});

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use('/courses', courseRouter);
app.use('/contact', contactRouter);

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('', async function (req, res) {
  res.json({ message: "Server response" });
});

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);  
    const port = process.env.PORT || 3000; 
    server.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
