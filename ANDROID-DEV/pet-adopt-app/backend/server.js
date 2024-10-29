import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();
const port = 8080;

// Apply CORS middleware correctly
app.use(cors({ origin: '*' }));

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    console.log('Request received');
    res.status(201).json({ data: "message received" });
});

app.listen(port, () => {
    console.log('App is listening on port', port);
});
