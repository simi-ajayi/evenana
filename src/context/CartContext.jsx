/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CART_STORAGE_KEY = 'evenana-landing-cart'

const CartContext = createContext(undefined)

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    if (typeof window === 'undefined') return []
    try {
      const stored = window.localStorage.getItem(CART_STORAGE_KEY)
      if (!stored) return []
      const parsed = JSON.parse(stored)
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const addItem = (item, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((entry) => entry.id === item.id)
      if (existing) {
        return prev.map((entry) => {
          if (entry.id !== item.id) return entry
          return { ...entry, quantity: entry.quantity + quantity }
        })
      }
      return [...prev, { ...item, quantity }]
    })
  }

  const removeItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeItem(id)
      return
    }
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item
        return { ...item, quantity }
      }),
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const itemCount = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items])
  const total = useMemo(() => items.reduce((sum, item) => sum + item.price * item.quantity, 0), [items])

  const value = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    itemCount,
    total,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used inside CartProvider')
  }
  return context
}
