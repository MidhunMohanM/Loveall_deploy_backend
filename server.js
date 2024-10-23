import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import authRoute from './routes/authRoute.js';
import userRoute from './routes/userRoute.js';
import paymentRoute from './routes/paymentRoute.js';
import profileRoute from './routes/profileRoute.js';  // Import profile route
import rateLimit from 'express-rate-limit';
import errorHandler from './middleware/errorHandler.js';

dotenv.config();

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 50
});
app.use(limiter);

app.get('/test', (req, res) => {
  res.send("Hello World");
});

app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/payment', paymentRoute);
app.use('/api/profile', profileRoute);  // Add the profile route here

app.use(errorHandler);

const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
