import { useCart } from '../hooks/useCart'
import { formatBRL } from '../lib/format'
import { IconMinus, IconPlus } from './icons'

interface Props {
  id: string
  /** Preço exibido no botão de adicionar (sempre vindo do catálogo). */
  price: number
  itemLabel: string
  /** Versão só-ícone, para quando o preço já aparece ao lado. */
  compact?: boolean
}

/**
 * Botão "adicionar" que vira um stepper quando o item já está na lista.
 * Só conhece o id do catálogo — preço e rótulo são exibição; o valor real
 * é sempre recalculado a partir do catálogo congelado no checkout.
 */
export function AddControl({ id, price, itemLabel, compact = false }: Props) {
  const { qtyOf, add, setQty } = useCart()
  const qty = qtyOf(id)

  if (qty === 0) {
    return (
      <button
        type="button"
        onClick={() => add(id)}
        aria-label={`Adicionar ${itemLabel} por ${formatBRL(price)}`}
        className={`btn shrink-0 gap-1.5 bg-grass-600 text-white hover:bg-grass-700 ${
          compact ? 'size-8' : 'px-3 py-1.5 text-xs'
        }`}
      >
        <IconPlus className="size-3.5" />
        {!compact && formatBRL(price)}
      </button>
    )
  }

  return (
    <div className="flex shrink-0 items-center gap-0.5 rounded-full border border-grass-200 bg-grass-50 p-0.5">
      <button
        type="button"
        onClick={() => setQty(id, qty - 1)}
        aria-label={`Diminuir quantidade de ${itemLabel}`}
        className="btn size-7 bg-paper text-grass-700 shadow-sm hover:bg-grass-100"
      >
        <IconMinus className="size-3.5" />
      </button>
      <span
        aria-live="polite"
        className="min-w-7 text-center text-sm font-extrabold text-grass-800 tabular-nums"
      >
        {qty}
      </span>
      <button
        type="button"
        onClick={() => add(id)}
        aria-label={`Aumentar quantidade de ${itemLabel}`}
        className="btn size-7 bg-paper text-grass-700 shadow-sm hover:bg-grass-100"
      >
        <IconPlus className="size-3.5" />
      </button>
    </div>
  )
}
