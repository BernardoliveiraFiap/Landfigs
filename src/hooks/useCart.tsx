import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from 'react'
import { SITE } from '../config/site'
import { CATALOG, CATALOG_IDS } from '../data/catalog'
import { loadCart, saveCart, type StoredCartItem } from '../lib/storage'

export interface CartLine extends StoredCartItem {
  label: string
  sublabel: string
  price: number
}

type Action =
  | { type: 'add'; id: string }
  | { type: 'remove'; id: string }
  | { type: 'setQty'; id: string; qty: number }
  | { type: 'clear' }

function reducer(state: StoredCartItem[], action: Action): StoredCartItem[] {
  switch (action.type) {
    case 'add': {
      // ids fora do catálogo congelado são ignorados silenciosamente
      if (!CATALOG_IDS.has(action.id)) return state
      const existing = state.find((i) => i.id === action.id)
      if (existing) {
        return state.map((i) =>
          i.id === action.id ? { ...i, qty: Math.min(i.qty + 1, SITE.cart.maxQtyPerItem) } : i,
        )
      }
      if (state.length >= SITE.cart.maxDistinctItems) return state
      return [...state, { id: action.id, qty: 1 }]
    }
    case 'setQty': {
      const qty = Math.min(Math.max(Math.trunc(action.qty), 0), SITE.cart.maxQtyPerItem)
      if (qty === 0) return state.filter((i) => i.id !== action.id)
      return state.map((i) => (i.id === action.id ? { ...i, qty } : i))
    }
    case 'remove':
      return state.filter((i) => i.id !== action.id)
    case 'clear':
      return []
  }
}

interface CartContextValue {
  lines: CartLine[]
  count: number
  total: number
  isOpen: boolean
  qtyOf: (id: string) => number
  add: (id: string) => void
  remove: (id: string) => void
  setQty: (id: string, qty: number) => void
  clear: () => void
  openDrawer: () => void
  closeDrawer: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(reducer, undefined, () => loadCart(CATALOG_IDS))
  const [isOpen, setOpen] = useState(false)

  useEffect(() => {
    saveCart(items)
  }, [items])

  // callbacks estáveis — quem depende deles em efeitos (ex.: CartDrawer)
  // não re-executa a cada mudança do carrinho
  const add = useCallback((id: string) => dispatch({ type: 'add', id }), [])
  const remove = useCallback((id: string) => dispatch({ type: 'remove', id }), [])
  const setQty = useCallback((id: string, qty: number) => dispatch({ type: 'setQty', id, qty }), [])
  const clear = useCallback(() => dispatch({ type: 'clear' }), [])
  const openDrawer = useCallback(() => setOpen(true), [])
  const closeDrawer = useCallback(() => setOpen(false), [])

  const value = useMemo<CartContextValue>(() => {
    const lines = items.flatMap((item) => {
      const info = CATALOG.get(item.id)
      return info
        ? [{ ...item, label: info.label, sublabel: info.sublabel, price: info.price }]
        : []
    })
    return {
      lines,
      count: lines.reduce((acc, l) => acc + l.qty, 0),
      total: lines.reduce((acc, l) => acc + l.price * l.qty, 0),
      isOpen,
      qtyOf: (id) => items.find((i) => i.id === id)?.qty ?? 0,
      add,
      remove,
      setQty,
      clear,
      openDrawer,
      closeDrawer,
    }
  }, [items, isOpen, add, remove, setQty, clear, openDrawer, closeDrawer])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart deve ser usado dentro de <CartProvider>')
  return ctx
}
