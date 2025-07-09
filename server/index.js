
import 'dotenv/config';
import express, { json, urlencoded } from 'express';
import logger from './middleware/logger.js';
import cors from 'cors';
import expensesRouter from './routes/api/expenses.js';

const app = express();


app.use(cors())

// Initialize the middleware
app.use(logger);
app.use(json());
app.use(urlencoded({extended: false}));

app.use('/api/expenses', expensesRouter);

const PORT = 3500;

app.listen(PORT, () => console.log(`Server started on port ${PORT}!!!`));