import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import VisitorRoutes from './routes/visitor.js';


const app = express();

app.use(express.json());
dotenv.config();


// Routes //
app.use('/visitor', VisitorRoutes)


const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`app is listing to PORT${PORT}`)
});


mongoose.connect(process.env.URL).then(() => {
    console.log(`app is conneted to database`);
})
