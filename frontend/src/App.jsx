import React from 'react'
import { NavLink, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard.jsx'
import Products from './pages/Products.jsx'
import Inventory from './pages/Inventory.jsx'
import Sales from './pages/Sales.jsx'
import Reports from './pages/Reports.jsx'
import Footer from './Components/Footer.jsx'

function Navbar(){
  return (
    <div className="nav">
      <div style={{fontWeight:700}}>Wings Cafe</div>
      <NavLink to="/" end>Dashboard</NavLink>
      <NavLink to="/products">Products</NavLink>
      <NavLink to="/inventory">Inventory</NavLink>
      <NavLink to="/sales">Sales</NavLink>
      <NavLink to="/reports">Reports</NavLink>
    </div>
  )
}

export default function App(){
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}
