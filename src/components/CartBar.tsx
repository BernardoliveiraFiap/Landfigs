import { useCart } from '../hooks/useCart'
import { formatBRL } from '../lib/format'
import { CheckoutButton } from './CheckoutButton'

/** Barra fixa que resume a lista assim que o primeiro item entra. */
export function CartBar() {
  const { count, total, isOpen, openDrawer } = useCart()
  if (count === 0 || isOpen) return null

  return (
    <>
      {/* espaçador em fluxo: impede a barra fixa de cobrir o fim da página */}
      <div aria-hidden className="h-20" />
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 shadow-[0_-8px_30px_-12px_rgb(13_27_20/0.25)] backdrop-blur">
      <div className="container-page flex flex-wrap items-center justify-between gap-3 py-3">
        <p className="text-sm font-bold">
          {count} figurinha{count === 1 ? '' : 's'} ·{' '}
          <span className="text-grass-700">{formatBRL(total)}</span>
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={openDrawer}
            className="btn border-2 border-line bg-paper px-4 py-2 text-sm hover:bg-mist"
          >
            Revisar lista
          </button>
          <CheckoutButton className="px-4 py-2 text-sm" />
          </div>
        </div>
      </div>
    </>
  )
}
