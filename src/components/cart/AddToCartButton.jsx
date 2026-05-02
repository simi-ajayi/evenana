import { useState } from 'react'
import { useCart } from '../../context/CartContext'

export function AddToCartButton({ product, disabled = false }) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  const handleClick = () => {
    addItem(product, 1)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <button
      onClick={handleClick}
      disabled={disabled || added}
      className={`mt-4 w-full rounded-xl px-4 py-2.5 text-sm font-semibold uppercase tracking-wide transition ${
        added
          ? 'bg-emerald-500 text-white'
          : disabled
          ? 'cursor-not-allowed bg-[#e2d4ef] text-[#8e78a2]'
          : 'bg-[#5c3f73] text-white hover:-translate-y-0.5 hover:bg-[#4b335f]'
      }`}
    >
      {added ? 'Added!' : disabled ? 'Out of Stock' : 'Add to cart'}
    </button>
  )
}
