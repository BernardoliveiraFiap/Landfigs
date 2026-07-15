import { useEffect, useRef } from 'react'
import { useCart } from '../hooks/useCart'
import { formatBRL } from '../lib/format'
import { CheckoutButton } from './CheckoutButton'
import { IconCart, IconMinus, IconPlus, IconTrash, IconX } from './icons'

export function CartDrawer() {
  const { lines, count, total, isOpen, closeDrawer, add, setQty, remove, clear } = useCart()
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return
    const previousFocus = document.activeElement as HTMLElement | null
    panelRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeDrawer()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      previousFocus?.focus()
    }
  }, [isOpen, closeDrawer])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        aria-label="Fechar lista"
        onClick={closeDrawer}
        className="absolute inset-0 cursor-default bg-ink/45"
      />

      <div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="Minha lista de figurinhas"
        className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-paper shadow-pop outline-none"
      >
        <header className="flex items-center justify-between gap-3 border-b border-line px-5 py-4">
          <h2 className="text-lg font-extrabold">
            Minha lista{' '}
            <span className="text-sm font-bold text-ink-soft">
              ({count} {count === 1 ? 'item' : 'itens'})
            </span>
          </h2>
          <div className="flex items-center gap-1">
            {lines.length > 0 && (
              <button
                type="button"
                onClick={clear}
                className="btn px-3 py-1.5 text-xs text-ink-soft hover:bg-mist hover:text-ink"
              >
                Limpar
              </button>
            )}
            <button
              type="button"
              onClick={closeDrawer}
              aria-label="Fechar"
              className="btn size-9 hover:bg-mist"
            >
              <IconX className="size-4.5" />
            </button>
          </div>
        </header>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
            <IconCart className="size-10 text-line" />
            <p className="font-bold">Sua lista está vazia</p>
            <p className="text-sm text-ink-soft">Comece pelos craques das semifinais.</p>
            <a href="#semifinalistas" onClick={closeDrawer} className="btn-primary mt-2">
              Ver semifinalistas
            </a>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-line overflow-y-auto">
              {lines.map((l) => (
                <li key={l.id} className="flex items-center gap-3 px-5 py-3.5">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold">{l.label}</p>
                    <p className="truncate text-xs text-ink-soft">{l.sublabel}</p>
                    <p className="mt-1 text-xs font-semibold text-grass-700">
                      {l.qty} × {formatBRL(l.price)} = {formatBRL(l.qty * l.price)}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-0.5 rounded-full border border-line p-0.5">
                    <button
                      type="button"
                      onClick={() => setQty(l.id, l.qty - 1)}
                      aria-label={`Diminuir quantidade de ${l.label}`}
                      className="btn size-7 hover:bg-mist"
                    >
                      <IconMinus className="size-3.5" />
                    </button>
                    <span className="min-w-6 text-center text-sm font-extrabold tabular-nums">
                      {l.qty}
                    </span>
                    <button
                      type="button"
                      onClick={() => add(l.id)}
                      aria-label={`Aumentar quantidade de ${l.label}`}
                      className="btn size-7 hover:bg-mist"
                    >
                      <IconPlus className="size-3.5" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => remove(l.id)}
                    aria-label={`Remover ${l.label}`}
                    className="btn size-8 shrink-0 text-ink-soft hover:bg-red-50 hover:text-red-600"
                  >
                    <IconTrash className="size-4" />
                  </button>
                </li>
              ))}
            </ul>

            <footer className="space-y-3 border-t border-line p-5">
              <div className="flex items-center justify-between">
                <span className="font-bold">Total dos itens</span>
                <span className="text-xl font-black text-grass-700">{formatBRL(total)}</span>
              </div>
              <CheckoutButton className="w-full px-6 py-3 text-sm" />
              <p className="text-center text-xs text-ink-soft">
                Preços tabelados. Pagamento e frete são combinados na conversa. Nada é cobrado
                pelo site.
              </p>
            </footer>
          </>
        )}
      </div>
    </div>
  )
}
