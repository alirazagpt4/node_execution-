dotenv.config();
import express from 'express';
import morgan from 'morgan'
import dotenv from 'dotenv';
import connectionDb from './Config/db.js';
import userRoutes from "./Routes/user.routes.js";
const app = express();
const port = process.env.PORT || 3000;



connectionDb();
app.use(express.json());
app.use(morgan('dev'));


app.get('/', (req, res) => {
  res.json('Hello World! Here is Ali Raza Afzal first node app connected with MongoDB deployeed');
});

app.use('/api/users', userRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});



