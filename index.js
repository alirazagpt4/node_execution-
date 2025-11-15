import express from 'express';
import mongoose from 'mongoose';
const app = express();
const port = 3000;
import dotenv from 'dotenv';
dotenv.config();
// iQDJrlrjduSZ4lTV
// mongodb+srv://ali4aug24webgpt:iQDJrlrjduSZ4lTV@cluster0.1cvcyyq.mongodb.net/?appName=Cluster0
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
  res.send('Hello World!');
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

