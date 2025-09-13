import React from 'react'

export default function Footer() {
  return (
    <footer style={{
      textAlign: 'center',
      padding: '16px',
      marginTop: '20px',
      background: '#111',
      color: '#fff',
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 1000  
    }}>
      <p>© {new Date().getFullYear()} Wings Cafe System</p>
      <p>Built by Karabo Tlali</p>
    </footer>
  )
}
