import express from "express";
import colors from "colors";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import goalRoutes from './routes/goalRoutes.js';
import { errorHandler, checkObjectId } from "./middleware/errorMiddleware.js";


connectDB();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/goals', goalRoutes)

app.use(checkObjectId)
app.use(errorHandler)

app.listen(PORT, ()=> {
  console.log(`Server running on port ${PORT}`);
})