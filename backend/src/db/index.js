import express from "express"
import fs from "fs"
import cors from "cors"

const app = express()
app.use(cors())
app.use(express.json())

const DB_FILE = "./src/db/db.json"

// Load DB
function loadDB() {
  return JSON.parse(fs.readFileSync(DB_FILE, "utf8"))
}

// Save DB
function saveDB(db) {
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2))
}

/* ------------------ PRODUCTS ------------------ */
app.get("/products", (req, res) => {
  const db = loadDB()
  res.json(db.products)
})

app.post("/products", (req, res) => {
  const db = loadDB()
  const { name, price, cost, quantity, category } = req.body

  if (!name || !price || !cost || !quantity || !category) {
    return res.status(400).json({ error: "Missing fields" })
  }

  const newProduct = {
    id: db.products.length + 1,
    name,
    price,
    cost,
    quantity,
    category
  }

  db.products.push(newProduct)
  saveDB(db)
  res.json(newProduct)
})

/* ------------------ SALES ------------------ */
app.get("/sales", (req, res) => {
  const db = loadDB()
  res.json(db.sales)
})

app.post("/sales", (req, res) => {
  const db = loadDB()
  const { productId, qty } = req.body
  const product = db.products.find(p => p.id === productId)

  if (!product) return res.status(404).json({ error: "Product not found" })
  if (product.quantity < qty) return res.status(400).json({ error: "Not enough stock" })

  // decrease stock
  product.quantity -= qty

  const newSale = {
    id: db.sales.length + 1,
    productId,
    qty,
    date: new Date().toISOString().slice(0, 10)
  }

  db.sales.push(newSale)
  saveDB(db)

  res.json(newSale)
})

/* ------------------ REPORTS ------------------ */
// Sales summary
app.get("/reports/sales-summary", (req, res) => {
  const db = loadDB()
  const today = new Date().toISOString().slice(0, 10)
  const todaysSales = db.sales.filter(s => s.date === today)

  let totalSales = 0
  let grossProfit = 0
  let productsSold = []

  todaysSales.forEach(sale => {
    const product = db.products.find(p => p.id === sale.productId)
    if (!product) return
    const revenue = product.price * sale.qty
    const profit = (product.price - product.cost) * sale.qty
    totalSales += revenue
    grossProfit += profit
    productsSold.push({ name: product.name, qty: sale.qty, revenue })
  })

  res.json({ totalSales, grossProfit, productsSold })
})

// Low stock report
app.get("/reports/low-stock", (req, res) => {
  const db = loadDB()
  const today = new Date().toISOString().slice(0, 10)

  const soldToday = {}
  db.sales.filter(s => s.date === today).forEach(s => {
    soldToday[s.productId] = (soldToday[s.productId] || 0) + s.qty
  })

  const items = db.products
    .filter(p => p.quantity < 5) // threshold
    .map(p => ({
      id: p.id,
      name: p.name,
      left: p.quantity,
      sold: soldToday[p.id] || 0,
      low: p.quantity < 5
    }))

  res.json({ items })
})

/* ------------------ START SERVER ------------------ */
app.listen(4000, () => {
  console.log("✅ Backend running on http://localhost:4000")
})
