import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from 'cors';
import * as dotenv from 'dotenv'

// routes
import foodRoutes from './routes/food.js';
import userRoutes from './routes/user.js';
import imageRoutes from './routes/image.js';
import businessRoutes from './routes/business.js';
import cartRoutes from './routes/cart.js';
import stripeRoutes from './routes/stripe.js';
import webhookRoutes from './routes/webhook.js';
import deliveryRoutes from './routes/delivery.js';

// init app
dotenv.config();
export const app = express();

// app setup
app.use(cors());
app.use('/webhook', webhookRoutes); // stripe webhooks require the raw body
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

// database setup
export const CONNECTION_URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.vo4oe5f.mongodb.net/?retryWrites=true&w=majority`;
const PORT = process.env.PORT || 5000;

// connect to mongoDB
mongoose.connect(CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.error(error.message));

// app routes
app.use('/food', foodRoutes);
app.use('/user', userRoutes);
app.use('/image', imageRoutes);
app.use('/business', businessRoutes);
app.use('/cart', cartRoutes);
app.use('/stripe', stripeRoutes); 
app.use('/delivery', deliveryRoutes);
