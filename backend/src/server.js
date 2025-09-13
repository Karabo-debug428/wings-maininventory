import express from 'express';
import cors from 'cors';

import productsRouter from './routes/products.js';
import transactionsRouter from './routes/transactions.js';
import customersRouter from './routes/customers.js';
import salesRouter from './routes/sales.js';
import reportsRouter from './routes/reports.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ ok: true, service: 'Wings Inventory API' });
});

app.use('/products', productsRouter);
app.use('/transactions', transactionsRouter);
app.use('/customers', customersRouter);
app.use('/sales', salesRouter);
app.use('/reports', reportsRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
