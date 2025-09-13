import React, { useEffect, useState } from 'react'
import api from '../api/client'

export default function Sales(){
  const [products, setProducts] = useState([])
  const [customers, setCustomers] = useState([])
  const [form, setForm] = useState({ productId:'', customerId:'', qty:'', unitPrice:'' })
  const [sales, setSales] = useState([])

  const load = () => {
    Promise.all([api.get('/products'), api.get('/customers'), api.get('/sales')])
    .then(([p,c,s]) => { setProducts(p.data); setCustomers(c.data); setSales(s.data.slice().reverse()) })
  }
  useEffect(load, [])

  const onSubmit = async (e) => {
    e.preventDefault()
    await api.post('/sales', { ...form, qty:Number(form.qty), unitPrice: form.unitPrice ? Number(form.unitPrice) : undefined })
    setForm({ productId:'', customerId:'', qty:'', unitPrice:'' })
    load()
  }

  return (
    <div>
      <h2>Sales</h2>
      <div className="card">
        <form onSubmit={onSubmit} className="row">
          <div style={{flex:'1 1 240px'}}>
            <label>Product</label>
            <select className="input" value={form.productId} onChange={e=>setForm({...form, productId:e.target.value})} required>
              <option value="">Select</option>
              {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>
          <div style={{flex:'1 1 240px'}}>
            <label>Customer</label>
            <select className="input" value={form.customerId} onChange={e=>setForm({...form, customerId:e.target.value})} required>
              <option value="">Select</option>
              {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div style={{flex:'1 1 240px'}}>
            <label>Quantity</label>
            <input type="number" className="input" value={form.qty} onChange={e=>setForm({...form, qty:e.target.value})} required />
          </div>
          <div style={{flex:'1 1 240px'}}>
            <label>Unit Price (optional)</label>
            <input type="number" className="input" value={form.unitPrice} onChange={e=>setForm({...form, unitPrice:e.target.value})} />
          </div>
          <button className="btn primary" type="submit">Record Sale</button>
        </form>
      </div>

      <div className="card" style={{marginTop:16}}>
        <h3 style={{marginTop:0}}>Recent Sales</h3>
        <table className="table">
          <thead><tr><th>Time</th><th>Product</th><th>Customer</th><th>Qty</th><th>Total</th></tr></thead>
          <tbody>
            {sales.map(s => {
              const p = products.find(x => x.id === s.productId)
              const c = customers.find(x => x.id === s.customerId)
              const total = (s.qty * s.unitPrice).toFixed(2)
              return <tr key={s.id}>
                <td>{new Date(s.createdAt).toLocaleString()}</td>
                <td>{p?.name || s.productId}</td>
                <td>{c?.name || s.customerId}</td>
                <td>{s.qty}</td>
                <td>M{total}</td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
