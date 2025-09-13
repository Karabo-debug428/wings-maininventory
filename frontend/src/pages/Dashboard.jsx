import React, { useEffect, useState } from 'react'
import api from '../api/client'

export default function Dashboard() {
  const [sales, setSales] = useState({ totalSales: 0, grossProfit: 0 })
  const [lowStock, setLowStock] = useState([])
  const [products, setProducts] = useState([])

  useEffect(() => {
    Promise.all([
      api.get('/reports/sales-summary'),
      api.get('/reports/low-stock'),
      api.get('/products')
    ]).then(([s, l, p]) => {
      setSales(s.data)
      setLowStock(l.data.items || [])
      setProducts(p.data)
    })
  }, [])

  return (
    <div>
      <h2>Dashboard</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '20px', marginTop: '20px' }}>
        
        {/* Sales Summary */}
        <div style={{ background: '#f4f4f4', padding: '20px', borderRadius: '8px' }}>
          <h3>Sales Summary</h3>
          <p><strong>Total Sales Today:</strong> M{sales.totalSales?.toFixed(2)}</p>
          <p><strong>Gross Profit:</strong> M{sales.grossProfit?.toFixed(2)}</p>
          <p><strong>Products Sold:</strong> {sales.productsSold?.length || 0}</p>
        </div>

        {/* Inventory Summary */}
        <div style={{ background: '#f4f4f4', padding: '20px', borderRadius: '8px' }}>
          <h3>Inventory Summary</h3>
          <p><strong>Total Products in Stock:</strong> {products.reduce((sum, p) => sum + p.quantity, 0)}</p>
          <p><strong>Low Stock Items:</strong> {lowStock.length}</p>
        </div>

        {/* Report Summary */}
        <div style={{ background: '#f4f4f4', padding: '20px', borderRadius: '8px' }}>
          <h3>Reports Summary</h3>
          <p><strong>Revenue Today:</strong> M{sales.totalSales?.toFixed(2)}</p>
          <p><strong>Low Stock Alerts:</strong> {lowStock.length}</p>
        </div>

        {/* Products Summary */}
        <div style={{ background: '#f4f4f4', padding: '20px', borderRadius: '8px' }}>
          <h3>Products Summary</h3>
          <p><strong>Total Products:</strong> {products.length}</p>
          <p><strong>Categories:</strong> {
            [...new Set(products.map(p => p.category))].join(", ") || "None"
          }</p>
        </div>
        <div style={{ height: "200px",}}></div>

      </div>
    </div>
  )
}
