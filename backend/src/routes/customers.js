import { Router } from 'express';
import { v4 as uuid } from 'uuid';
import { getAll, push, update, remove } from '../lib/store.js';
import { requireFields } from '../lib/validators.js';

const router = Router();

router.get('/', (req, res) => res.json(getAll('customers')));

router.post('/', (req, res) => {
  const { ok, missing } = requireFields(req.body, ['name']);
  if (!ok) return res.status(400).json({ error: 'Missing fields', missing });
  const customer = {
    id: uuid(),
    name: req.body.name,
    phone: req.body.phone || '',
    email: req.body.email || '',
    createdAt: new Date().toISOString()
  };
  push('customers', customer);
  res.status(201).json(customer);
});

router.put('/:id', (req, res) => {
  const existing = getAll('customers').find(c => c.id === req.params.id);
  if (!existing) return res.status(404).json({ error: 'Customer not found' });
  res.json(update('customers', req.params.id, req.body));
});

router.delete('/:id', (req, res) => {
  const ok = remove('customers', req.params.id);
  if (!ok) return res.status(404).json({ error: 'Customer not found' });
  res.json({ ok: true });
});

export default router;
