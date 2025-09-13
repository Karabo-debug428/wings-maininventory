import { Router } from 'express';
import { v4 as uuid } from 'uuid';
import { getAll, push, update, remove } from '../lib/store.js';
import { requireFields } from '../lib/validators.js';

const router = Router();

router.get('/', (req, res) => {
  res.json(getAll('products'));
});

router.post('/', (req, res) => {
  const { ok, missing } = requireFields(req.body, ['name','category','price','quantity']);
  if (!ok) return res.status(400).json({ error: 'Missing fields', missing });

  const product = {
    id: uuid(),
    name: req.body.name,
    description: req.body.description || '',
    category: req.body.category,
    price: Number(req.body.price) || 0,
    quantity: Number(req.body.quantity) || 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  push('products', product);
  res.status(201).json(product);
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const existing = getAll('products').find(p => p.id === id);
  if (!existing) return res.status(404).json({ error: 'Product not found' });
  const patch = { ...req.body, updatedAt: new Date().toISOString() };
  const updated = update('products', id, patch);
  res.json(updated);
});

router.delete('/:id', (req, res) => {
  const ok = remove('products', req.params.id);
  if (!ok) return res.status(404).json({ error: 'Product not found' });
  res.json({ ok: true });
});

export default router;
