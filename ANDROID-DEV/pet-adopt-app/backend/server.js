import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';


import authRoute from './routes/auth.route.js'
import petRoute from './routes/pet.route.js'
import userRoute from './routes/user.route.js'

const app = express();
const port = 8080;

app.use(cors({ origin: '*' }));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use('/api/pet', petRoute);
app.use('/api/user', userRoute);
app.get('/', (req, res) => {
    console.log('Request received');
    res.status(201).json({ data: "message received" });
});

app.listen(port, () => {
    console.log('App is listening on port', port);
});
