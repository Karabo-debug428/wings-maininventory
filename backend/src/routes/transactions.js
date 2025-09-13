import { Router } from 'express';
import { v4 as uuid } from 'uuid';
import { getAll, setAll, push, readWholeDB, writeWholeDB } from '../lib/store.js';
import { requireFields } from '../lib/validators.js';

const router = Router();

router.get('/', (req, res) => {
  res.json(getAll('transactions'));
});

router.post('/', (req, res) => {
  const { ok, missing } = requireFields(req.body, ['productId','type','qty']);
  if (!ok) return res.status(400).json({ error: 'Missing fields', missing });
  const qty = Number(req.body.qty);
  if (!['in','out'].includes(req.body.type)) return res.status(400).json({ error: 'type must be in|out' });
  if (qty <= 0) return res.status(400).json({ error: 'qty must be > 0' });

  const db = readWholeDB();
  const product = db.products.find(p => p.id === req.body.productId);
  if (!product) return res.status(404).json({ error: 'Product not found' });

  if (req.body.type === 'out' && product.quantity - qty < 0) {
    return res.status(400).json({ error: 'Insufficient stock' });
  }

  product.quantity += (req.body.type === 'in' ? qty : -qty);
  product.updatedAt = new Date().toISOString();

  const tx = {
    id: uuid(),
    productId: product.id,
    type: req.body.type,
    qty,
    note: req.body.note || '',
    createdAt: new Date().toISOString()
  };

  db.transactions.push(tx);
  writeWholeDB(db);
  res.status(201).json({ tx, product });
});

export default router;
