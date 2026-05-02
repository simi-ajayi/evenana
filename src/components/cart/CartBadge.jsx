import { useCart } from '../../context/CartContext'

export function CartBadge() {
  const { itemCount } = useCart()

  if (itemCount === 0) return null

  return (
    <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center bg-[#0B1F3A] text-[10px] font-semibold text-white">
      {itemCount > 9 ? '9+' : itemCount}
    </span>
  )
}
