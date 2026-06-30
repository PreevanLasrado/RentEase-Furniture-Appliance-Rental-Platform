import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <App />
          <Toaster 
            position="top-center" 
            containerStyle={{ zIndex: 999999 }} 
            toastOptions={{
              style: {
                maxWidth: 'none',
              }
            }}
          />
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  </StrictMode>,
)
