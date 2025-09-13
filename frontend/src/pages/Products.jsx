import React, { useEffect, useState } from 'react'
import api from '../api/client'

export default function Products() {
  const [products, setProducts] = useState([])
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [cost, setCost] = useState("")
  const [quantity, setQuantity] = useState("")
  const [category, setCategory] = useState("")

  // Load existing products
  useEffect(() => {
    api.get('/products').then(res => setProducts(res.data))
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newProduct = { name, price: Number(price), cost: Number(cost), quantity: Number(quantity), category }
    try {
      const res = await api.post('/products', newProduct)
      setProducts([...products, res.data]) // add to table
      setName(""); setPrice(""); setCost(""); setQuantity(""); setCategory("")
    } catch (err) {
      alert("Error adding product")
    }
  }

  return (
    <div>
      <h2>Products</h2>

      {/* Add Product Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input 
          type="text" placeholder="Name" value={name} 
          onChange={(e) => setName(e.target.value)} required 
        />
        <input 
          type="number" placeholder="Price" value={price} 
          onChange={(e) => setPrice(e.target.value)} required 
        />
        <input 
          type="number" placeholder="Cost" value={cost} 
          onChange={(e) => setCost(e.target.value)} required 
        />
        <input 
          type="number" placeholder="Quantity" value={quantity} 
          onChange={(e) => setQuantity(e.target.value)} required 
        />

        {/* Category Dropdown */}
        <select value={category} onChange={(e) => setCategory(e.target.value)} required>
          <option value="">-- Select Category --</option>
          <option value="Food">Food</option>
          <option value="Drinks">Drinks</option>
          <option value="Snacks">Snacks</option>
          <option value="Desserts">Desserts</option>
        </select>

        <button type="submit">Add Product</button>
      </form>
      

      {/* Products Table */}
      <table border="1" cellPadding="8" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price (M)</th>
            <th>Cost (M)</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.category}</td>
              <td>{p.price}</td>
              <td>{p.cost}</td>
              <td>{p.quantity}</td>
            </tr>
          ))}
          <div style={{ height: "200px",}}></div>
        </tbody>
      </table>
    </div>
  )
}
