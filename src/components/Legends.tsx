import { useState } from 'react'
import { SITE } from '../config/site'
import { LEGENDS, LEGEND_VARIANTS, type LegendVariantInfo } from '../data/legends'
import type { LegendPlayer } from '../data/types'
import { formatBRL } from '../lib/format'
import { AddControl } from './AddControl'
import { PlayerPhoto } from './PlayerPhoto'

export function Legends() {
  const [variant, setVariant] = useState<LegendVariantInfo>(LEGEND_VARIANTS[0])
  const price = SITE.prices.legends[variant.key]

  return (
    <section id="legends" className="border-b border-line bg-ink">
      <div className="container-page py-16 sm:py-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="kicker text-gold-300">Panini Extra Stickers</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
              Legends: as mais raras do álbum
            </h2>
            <p className="mt-3 text-white/70 text-pretty">
              20 craques fora da numeração do álbum, encontrados em média a cada 100 envelopes.
              Cada um existe em 4 variações de cor, da Roxa à Ouro, a mais valiosa da coleção.
              Estoque confirmado na hora, no WhatsApp.
            </p>
          </div>

          <div className="flex gap-6" aria-label="Escolher variação de cor">
            {LEGEND_VARIANTS.map((v) => {
              const active = v.key === variant.key
              return (
                <button
                  key={v.key}
                  type="button"
                  onClick={() => setVariant(v)}
                  aria-pressed={active}
                  className={`border-b-2 pb-1.5 text-sm font-bold transition-colors ${
                    active
                      ? 'border-gold-300 text-white'
                      : 'border-transparent text-white/55 hover:text-white'
                  }`}
                >
                  <span
                    className="mr-1.5 inline-block size-2.5 rounded-full align-middle"
                    style={{ background: `linear-gradient(135deg, ${v.from}, ${v.via})` }}
                  />
                  {v.label}
                </button>
              )
            })}
          </div>
        </div>

        <p className="mt-6 text-sm font-bold text-gold-200">
          Variação {variant.label} · {formatBRL(price)} por figurinha
        </p>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
          {LEGENDS.map((legend) => (
            <LegendCard key={legend.slug} legend={legend} variant={variant} price={price} />
          ))}
        </div>
      </div>
    </section>
  )
}

function LegendCard({
  legend,
  variant,
  price,
}: {
  legend: LegendPlayer
  variant: LegendVariantInfo
  price: number
}) {
  const id = `lg:${legend.slug}:${variant.key}`

  return (
    <article
      className="rounded-2xl p-[3px] shadow-pop"
      style={{
        background: `linear-gradient(135deg, ${variant.from}, ${variant.via} 50%, ${variant.to})`,
      }}
    >
      <div className="flex h-full flex-col overflow-hidden rounded-[13px] bg-paper">
        <div
          className="foil relative aspect-[3/4]"
          style={{ background: `linear-gradient(165deg, ${variant.via}, #101418 90%)` }}
        >
          <PlayerPhoto slug={legend.photoSlug} alt="" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/85 via-black/35 to-transparent" />

          <div className="absolute top-2 left-2 flex items-center gap-1.5">
            <img
              src={`/flags/${legend.iso}.webp`}
              alt=""
              width={22}
              loading="lazy"
              className="rounded-[3px] shadow-sm"
            />
          </div>
          <span
            className="absolute top-2 right-2 text-[9px] font-black tracking-[0.2em] uppercase drop-shadow-md"
            style={{ color: variant.from }}
          >
            {variant.label}
          </span>

          <div className="absolute inset-x-0 bottom-0 p-2.5">
            <h3 className="truncate text-sm font-extrabold tracking-wide text-white uppercase" title={legend.name}>
              {legend.name}
            </h3>
            <p className="truncate text-[10px] font-semibold text-white/80">
              Legend · {legend.countryPt}
            </p>
          </div>
        </div>

        <div className="z-[2] flex items-center justify-between gap-1 bg-paper px-2.5 py-2">
          <span className="text-sm font-extrabold">{formatBRL(price)}</span>
          <AddControl
            id={id}
            price={price}
            itemLabel={`Legend ${variant.label}: ${legend.name}`}
            compact
          />
        </div>
      </div>
    </article>
  )
}
