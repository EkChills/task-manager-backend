require("dotenv").config()
const express = require("express");
const app = express();
const { connectDb } = require("./db/connect");
const {errorHandlerMiddleware} = require('./middleware/errorHandler')
const notFound = require('./middleware/notFound')
const router = require('./routes/tasks')

const port = process.env.PORT || 3000;

app.use(express.json())
app.use('/api/v1/tasks',router)
app.use(notFound)
app.use(errorHandlerMiddleware)

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    app.listen(port, console.log(`app listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
