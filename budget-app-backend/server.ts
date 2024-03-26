import express from 'express';
import ExpenseController from './controllers/ExpenseController';
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors())

app.use(express.json());

app.use('/', ExpenseController);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


