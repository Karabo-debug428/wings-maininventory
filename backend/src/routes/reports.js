import { Router } from 'express';
import { readWholeDB } from '../lib/store.js';

const router = Router();

const LOW_STOCK_THRESHOLD = 10;

router.get('/low-stock', (req, res) => {
  const { products } = readWholeDB();
  const low = products.filter(p => p.quantity <= LOW_STOCK_THRESHOLD);
  res.json({ threshold: LOW_STOCK_THRESHOLD, items: low });
});

router.get('/sales-summary', (req, res) => {
  const { sales, products } = readWholeDB();
  const totalSales = sales.reduce((sum, s) => sum + s.qty * s.unitPrice, 0);
  const byProduct = {};
  for (const s of sales) {
    const p = products.find(x => x.id === s.productId);
    const name = p ? p.name : s.productId;
    byProduct[name] = (byProduct[name] || 0) + s.qty * s.unitPrice;
  }
  res.json({ totalSales, byProduct });
});

export default router;
