import express from "express";
import dotenv from "dotenv"
dotenv.config();
import goalRoutes from './routes/goalRoutes.js';
import { errorHandler } from "./middleware/errorMiddleware.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/goals', goalRoutes)


app.use(errorHandler)
app.listen(PORT, ()=> {
  console.log(`Server running on port ${PORT}`);
})