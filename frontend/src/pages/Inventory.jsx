import React, { useEffect, useState } from 'react'
import api from '../api/client'

export default function Inventory(){
  const [products, setProducts] = useState([])
  const [txs, setTxs] = useState([])
  const [form, setForm] = useState({ productId:'', type:'in', qty:'', note:'' })

  const load = () => {
    Promise.all([api.get('/products'), api.get('/transactions')])
    .then(([p,t]) => {
      setProducts(p.data)
      setTxs(t.data.slice().reverse())
    })
  }
  useEffect(load, [])

  const onSubmit = async (e) => {
    e.preventDefault()
    await api.post('/transactions', { ...form, qty:Number(form.qty) })
    setForm({ productId:'', type:'in', qty:'', note:'' })
    load()
  }

  return (
    <div>
      <h2>Inventory</h2>
      <div className="card">
        <form onSubmit={onSubmit} className="row">
          <div style={{flex:'1 1 240px'}}>
            <label>Product</label>
            <select className="input" value={form.productId} onChange={e=>setForm({...form, productId:e.target.value})} required>
              <option value="">Select product</option>
              {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>
          <div style={{flex:'1 1 240px'}}>
            <label>Type</label>
            <select className="input" value={form.type} onChange={e=>setForm({...form, type:e.target.value})}>
              <option value="in">Add Stock</option>
              <option value="out">Remove Stock</option>
            </select>
          </div>
          <div style={{flex:'1 1 240px'}}>
            <label>Quantity</label>
            <input type="number" className="input" value={form.qty} onChange={e=>setForm({...form, qty:e.target.value})} required />
          </div>
          <div style={{flex:'1 1 100%'}}>
            <label>Note</label>
            <input className="input" value={form.note} onChange={e=>setForm({...form, note:e.target.value})} />
          </div>
          <button className="btn primary" type="submit">Record</button>
        </form>
      </div>
      <div style={{ height: "200px",}}></div>

      <div className="card" style={{marginTop:16}}>
        <h3 style={{marginTop:0}}>Recent Transactions</h3>
        <table className="table">
          <thead><tr><th>Time</th><th>Product</th><th>Type</th><th>Qty</th><th>Note</th></tr></thead>
          <tbody>
            {txs.map(t => (
              <tr key={t.id}>
                <td>{new Date(t.createdAt).toLocaleString()}</td>
                <td>{products.find(p => p.id === t.productId)?.name || t.productId}</td>
                <td>{t.type}</td>
                <td>{t.qty}</td>
                <td>{t.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
