import { Router } from 'express';
import { v4 as uuid } from 'uuid';
import { readWholeDB, writeWholeDB } from '../lib/store.js';
import { requireFields } from '../lib/validators.js';

const router = Router();

router.get('/', (req, res) => {
  res.json(readWholeDB().sales);
});

router.post('/', (req, res) => {
  const { ok, missing } = requireFields(req.body, ['productId','customerId','qty']);
  if (!ok) return res.status(400).json({ error: 'Missing fields', missing });

  const qty = Number(req.body.qty);
  if (qty <= 0) return res.status(400).json({ error: 'qty must be > 0' });

  const db = readWholeDB();
  const product = db.products.find(p => p.id === req.body.productId);
  const customer = db.customers.find(c => c.id === req.body.customerId);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  if (!customer) return res.status(404).json({ error: 'Customer not found' });
  if (product.quantity - qty < 0) return res.status(400).json({ error: 'Insufficient stock' });

  const sale = {
    id: uuid(),
    productId: product.id,
    customerId: customer.id,
    qty,
    unitPrice: Number(req.body.unitPrice ?? product.price),
    createdAt: new Date().toISOString()
  };
  db.sales.push(sale);

  // adjust stock
  product.quantity -= qty;
  product.updatedAt = new Date().toISOString();

  // add transaction record too
  db.transactions.push({
    id: uuid(),
    productId: product.id,
    type: 'out',
    qty,
    note: `Sale to ${customer.name}`,
    createdAt: new Date().toISOString()
  });

  writeWholeDB(db);
  res.status(201).json(sale);
});

export default router;
