import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js'
import blogRoutes from './routes/blogRoutes.js'
import commentRoutes from './routes/commentRoutes.js'
import cookieParser from 'cookie-parser';
import cors from 'cors'
const app = express();
dotenv.config();
const port = process.env.PORT || 2000;

app.use(helmet({ contentSecurityPolicy: false }));
app.use(compression());
app.use(cookieParser())

app.use(cors({
    origin: 'https://deep-write.vercel.app',
    credentials: true
}));

// database connection
connectDB();

app.use(express.json());

app.use('/api/auth',userRoutes)
app.use('/api/blog', blogRoutes)
app.use('/api/comment', commentRoutes)


app.get('/',(req, res) => {
    res.json({msg: "Server working fine"})
})


app.listen(port, () => {
    console.log(`server is listening on ${port}`)
})