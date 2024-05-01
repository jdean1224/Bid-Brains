import express from 'express';
import cors from 'cors';
import userRouter from './routes/userRoutes.js'
import auctionRouter from './routes/auctionRoutes.js'
import cookieParser from 'cookie-parser'
import { fileURLToPath } from 'url';
import path from 'path'

const app = express();
app.use(express.json());
app.use(cors({
	origin: ['http://localhost:5173'],
	credentials: true
}));
app.use(cookieParser())

app.use('/users', userRouter)
app.use('/auctions', auctionRouter)

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagesDirectory = path.join(__dirname, 'public');
// app.use('/public', express.static(imagesDirectory))
app.use(express.static('public'))


export default app




