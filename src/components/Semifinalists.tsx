import { useState } from 'react'
import { SITE } from '../config/site'
import { priceOf } from '../data/catalog'
import { SQUADS } from '../data/squads'
import type { Position } from '../data/types'
import { useCart } from '../hooks/useCart'
import { formatBRL } from '../lib/format'
import { PlayerSticker } from './PlayerSticker'
import { SectionHeading } from './SectionHeading'
import { IconPlus } from './icons'

const POSITIONS: ReadonlyArray<readonly [key: 'ALL' | Position, label: string]> = [
  ['ALL', 'Todos'],
  ['GOL', 'Goleiros'],
  ['DEF', 'Defensores'],
  ['MEI', 'Meias'],
  ['ATA', 'Atacantes'],
]

export function Semifinalists() {
  const [iso, setIso] = useState(SQUADS[0].iso)
  const [pos, setPos] = useState<'ALL' | Position>('ALL')
  const { add } = useCart()

  const squad = SQUADS.find((s) => s.iso === iso) ?? SQUADS[0]
  const basePrice = SITE.prices.playerSemifinalist
  const squadTotal = squad.players.reduce((acc, p) => acc + priceOf(`sf:${squad.iso}:${p.number}`), 0)
  const players = pos === 'ALL' ? squad.players : squad.players.filter((p) => p.position === pos)

  function addFullSquad() {
    for (const p of squad.players) add(`sf:${squad.iso}:${p.number}`)
  }

  return (
    <section id="semifinalistas" className="border-b border-line">
      <div className="container-page py-16 sm:py-20">
        <SectionHeading
          kicker="Oferta da reta final"
          title={
            <>
              Jogadores dos 4 semifinalistas a partir de{' '}
              <span className="text-gradient-ouro">{formatBRL(basePrice)}</span>
            </>
          }
          sub="França, Espanha, Inglaterra e Argentina com os 26 convocados oficiais de cada seleção. Escolha pelo nome e pelo número da camisa. Super-craques como Messi, Mbappé e Lamine Yamal têm preço próprio, marcado na figurinha."
        />

        <div className="mt-10 flex flex-wrap items-end justify-between gap-x-6 gap-y-5 border-b border-line pb-px">
          <div className="flex flex-wrap gap-6" aria-label="Escolher seleção">
            {SQUADS.map((s) => {
              const active = s.iso === squad.iso
              return (
                <button
                  key={s.iso}
                  type="button"
                  onClick={() => setIso(s.iso)}
                  aria-pressed={active}
                  className={`-mb-px flex items-center gap-2 border-b-2 pb-2.5 text-sm font-bold transition-colors ${
                    active
                      ? 'border-grass-600 text-ink'
                      : 'border-transparent text-ink-soft hover:text-ink'
                  }`}
                >
                  <img
                    src={`/flags/${s.iso}.webp`}
                    alt=""
                    width={22}
                    className="rounded-[2px] ring-1 ring-ink/10"
                  />
                  {s.countryPt}
                </button>
              )
            })}
          </div>

          <div className="flex flex-wrap gap-5" aria-label="Filtrar por posição">
            {POSITIONS.map(([key, label]) => {
              const active = key === pos
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setPos(key)}
                  aria-pressed={active}
                  className={`-mb-px border-b-2 pb-2.5 text-xs font-bold transition-colors ${
                    active
                      ? 'border-gold-500 text-ink'
                      : 'border-transparent text-ink-soft hover:text-ink'
                  }`}
                >
                  {label}
                </button>
              )
            })}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-ink-soft">
            <strong className="font-extrabold text-ink">{squad.countryPt}</strong> · técnico{' '}
            {squad.coach} · {players.length} de {squad.players.length} convocados
          </p>
          <button
            type="button"
            onClick={addFullSquad}
            aria-label={`Adicionar uma unidade de cada um dos ${squad.players.length} jogadores da ${squad.countryPt}`}
            className="btn gap-1.5 border-2 border-gold-400 bg-gold-100 px-4 py-2 text-xs font-black tracking-wide text-gold-700 uppercase hover:bg-gold-200"
          >
            <IconPlus className="size-3.5" />
            Elenco completo · {formatBRL(squadTotal)}
          </button>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {players.map((p) => (
            <PlayerSticker key={p.number} squad={squad} player={p} />
          ))}
        </div>
      </div>
    </section>
  )
}
