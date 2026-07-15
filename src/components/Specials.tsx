import { SITE } from '../config/site'
import { FWC_CARDS } from '../data/fwc'
import { MASCOTS_AND_TROPHY, STADIUMS } from '../data/specials'
import type { SpecialItem } from '../data/types'
import { formatBRL } from '../lib/format'
import { AddControl } from './AddControl'
import { SectionHeading } from './SectionHeading'
import { IconStadium, IconTag, IconTrophy } from './icons'

export function Specials() {
  return (
    <section id="especiais" className="border-b border-line">
      <div className="container-page py-16 sm:py-20">
        <SectionHeading
          kicker="Figurinhas especiais"
          title="Mascotes, taça dourada e os 16 estádios"
          sub="As páginas que separam um álbum bom de um álbum completo."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {MASCOTS_AND_TROPHY.map((s) => {
            const isTrophy = s.id === 'sp:taca-dourada'
            return (
              <article
                key={s.id}
                className={`card flex flex-col items-center gap-3 p-6 text-center ${
                  isTrophy ? 'foil border-gold-300 bg-linear-to-b from-gold-100/70 to-paper' : ''
                }`}
              >
                {isTrophy ? (
                  <span className="flex size-16 items-center justify-center rounded-2xl bg-linear-to-br from-gold-300 to-gold-500 text-white">
                    <IconTrophy className="size-8" />
                  </span>
                ) : (
                  <MascotVisual item={s} />
                )}
                <div>
                  <h3 className="font-extrabold">{s.title}</h3>
                  <p className="mt-0.5 text-xs text-ink-soft">{s.subtitle}</p>
                </div>
                <div className="z-[2] mt-auto flex items-center gap-3">
                  <span className="text-sm font-extrabold">{formatBRL(s.price)}</span>
                  <AddControl id={s.id} price={s.price} itemLabel={s.title} compact />
                </div>
              </article>
            )
          })}
        </div>

        <h3 className="mt-14 flex items-center gap-2 text-lg font-extrabold">
          <IconTag className="size-5 text-grass-600" />
          Cartas FWC · seção de abertura do álbum
        </h3>
        <p className="mt-1 text-sm text-ink-soft">
          As especiais numeradas da abertura. Cada carta tem seu preço; você fecha o número exato
          na conversa.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {FWC_CARDS.map((c) => (
            <div key={c.id} className="card flex items-center justify-between gap-2 px-4 py-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-bold">{c.title}</p>
                <p className="truncate text-xs text-ink-soft">{c.subtitle}</p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <span className="text-sm font-extrabold">{formatBRL(c.price)}</span>
                <AddControl id={c.id} price={c.price} itemLabel={c.title} compact />
              </div>
            </div>
          ))}
        </div>

        <h3 className="mt-14 flex items-center gap-2 text-lg font-extrabold">
          <IconStadium className="size-5 text-grass-600" />
          Os 16 estádios-sede · {formatBRL(SITE.prices.stadium)} cada
        </h3>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {STADIUMS.map((s) => (
            <div key={s.id} className="card flex items-center justify-between gap-2 px-4 py-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-bold">{s.title}</p>
                <p className="truncate text-xs text-ink-soft">{s.subtitle}</p>
              </div>
              <AddControl id={s.id} price={s.price} itemLabel={s.title} compact />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/**
 * Visual do mascote: a arte oficial dos mascotes é protegida pela FIFA e não
 * é embutida no projeto, então o card usa a bandeira do país-sede. Se você
 * tiver licença para usar a imagem oficial, salve-a em
 * public/mascots/<photo>.jpg e troque o corpo desta função por um <img>.
 */
function MascotVisual({ item }: { item: SpecialItem }) {
  return (
    <span className="flex size-16 items-center justify-center rounded-2xl bg-mist ring-1 ring-line">
      {item.iso && (
        <img
          src={`/flags/${item.iso}.webp`}
          alt={`Bandeira do país-sede do mascote ${item.title}`}
          width={42}
          className="rounded-[3px] ring-1 ring-ink/10"
        />
      )}
    </span>
  )
}
