import { useCart } from '../hooks/useCart'
import { IconCart } from './icons'

const NAV = [
  ['#buscar', 'Buscar'],
  ['#semifinalistas', 'Semifinalistas'],
  ['#legends', 'Legends'],
  ['#selecoes', 'Seleções'],
  ['#especiais', 'Especiais'],
  ['#faq', 'FAQ'],
] as const

export function Header() {
  const { count, openDrawer } = useCart()

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-paper/85 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <a href="#top" className="flex items-center gap-2.5">
          <img src="/favicon.svg" alt="" className="size-9" />
          <span className="leading-tight">
            <span className="block text-xl font-black tracking-tight">
              Craque<span className="text-grass-600">Box</span>
            </span>
            <span className="-mt-0.5 block text-[10px] font-bold tracking-[0.24em] text-ink-soft uppercase">
              Figurinhas da Copa 2026
            </span>
          </span>
        </a>

        <nav
          className="hidden items-center gap-6 text-sm font-semibold text-ink-soft lg:flex"
          aria-label="Seções da página"
        >
          {NAV.map(([href, label]) => (
            <a key={href} href={href} className="transition-colors hover:text-ink">
              {label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={openDrawer}
          aria-label={`Abrir minha lista (${count} ${count === 1 ? 'item' : 'itens'})`}
          className="btn relative border-2 border-line bg-paper px-4 py-2 text-sm hover:border-grass-300 hover:bg-grass-50"
        >
          <IconCart className="size-4" />
          <span className="hidden sm:inline">Minha lista</span>
          {count > 0 && (
            <span className="absolute -top-1.5 -right-1.5 flex size-5 items-center justify-center rounded-full bg-grass-600 text-[11px] font-bold text-white">
              {count > 99 ? '99+' : count}
            </span>
          )}
        </button>
      </div>
    </header>
  )
}
