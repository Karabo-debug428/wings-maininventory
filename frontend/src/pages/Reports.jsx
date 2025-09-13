import React, { useEffect, useState } from 'react'
import api from '../api/client'

export default function Reports(){
  const [low, setLow] = useState([])
  const [summary, setSummary] = useState({
    totalSales: 0,
    grossProfit: 0,
    productsSold: [],
  })

  useEffect(() => {
    Promise.all([
      api.get('/reports/low-stock'),
      api.get('/reports/sales-summary')
    ]).then(([l,s]) => {
      setLow(l.data.items || [])
      setSummary(s.data)
    })
  }, [])

  return (
    <div>
      <h2>Reports</h2>

     
      <div className="card">
        <h3 style={{marginTop:0}}>Inventory Needed(Low Stock) </h3>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Qty Left</th>
              <th>Sold Today</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {low.map(i => (
              <tr key={i.id}>
                <td>{i.name}</td>
                <td>{i.left}</td>
                <td>{i.sold}</td>
                <td>
                   {i.low ? <span style={{color:'red'}}>⚠️ Low Stock</span> : "OK"}
                </td>
              </tr>
            ))}
            {low.length === 0 && <tr><td colSpan="4">No low stock items</td></tr>}
          </tbody>
        </table>
      </div>

      <div className="card" style={{marginTop:16}}>
        <h3 style={{marginTop:0}}>Sales Summary</h3>
        <div><strong>Total Sales Today:</strong> M{summary.totalSales?.toFixed(2)}</div>
        <div><strong>Gross Profit:</strong> M{summary.grossProfit?.toFixed(2)}</div>

        <table className="table" style={{marginTop:8}}>
          <thead>
            <tr><th>Product</th><th>Qty Sold</th><th>Revenue</th></tr>
          </thead>
          <tbody>
            {summary.productsSold?.map(p => (
              <tr key={p.name}>
                <td>{p.name}</td>
                <td>{p.qty}</td>
                <td>M{p.revenue.toFixed(2)}</td>
              </tr>
            ))}
            <div style={{ height: "500px",}}></div>
            {summary.productsSold?.length === 0 &&
              <tr><td colSpan="3">No sales yet</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  )
}

