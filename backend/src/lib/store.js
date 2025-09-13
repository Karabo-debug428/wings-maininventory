import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_PATH = path.join(__dirname, '..', 'db', 'db.json');

function readDB() {
  if (!fs.existsSync(DB_PATH)) {
    fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
    fs.writeFileSync(DB_PATH, JSON.stringify({ products: [], transactions: [], customers: [], sales: [] }, null, 2));
  }
  const raw = fs.readFileSync(DB_PATH, 'utf-8');
  return JSON.parse(raw || '{"products":[],"transactions":[],"customers":[],"sales":[]}');
}

function writeDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

export function getAll(collection) {
  const db = readDB();
  return db[collection] || [];
}

export function setAll(collection, items) {
  const db = readDB();
  db[collection] = items;
  writeDB(db);
  return db[collection];
}

export function push(collection, item) {
  const db = readDB();
  db[collection] = db[collection] || [];
  db[collection].push(item);
  writeDB(db);
  return item;
}

export function update(collection, id, patch) {
  const db = readDB();
  const list = db[collection] || [];
  const idx = list.findIndex(x => x.id === id);
  if (idx === -1) return null;
  list[idx] = { ...list[idx], ...patch };
  db[collection] = list;
  writeDB(db);
  return list[idx];
}

export function remove(collection, id) {
  const db = readDB();
  const list = db[collection] || [];
  const idx = list.findIndex(x => x.id === id);
  if (idx === -1) return false;
  list.splice(idx, 1);
  db[collection] = list;
  writeDB(db);
  return true;
}

export function writeWholeDB(nextDB) {
  writeDB(nextDB);
}

export function readWholeDB() {
  return readDB();
}
