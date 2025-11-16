import express from 'express';
import mongoose from 'mongoose';
const app = express();
const port = 3000;
import dotenv from 'dotenv';
dotenv.config();

const connectionDb = async () => {
    try {
        console.log("Connecting to DB...");
        await mongoose.connect(process.env.MONGO_URI);

        console.log("Database connected successfully");
        
    } catch (err) {
        console.log("Database connection failed:", err);
    }
};

connectionDb();

app.get('/', (req, res) => {
  res.json('Hello World! Here is Ali Raza Afzal First backend project deployement...');
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});


// mongodb+srv://ali4aug24webgpt:
