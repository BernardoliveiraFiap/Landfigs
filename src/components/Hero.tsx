import { useEffect, useState } from 'react'
import { SITE } from '../config/site'
import { SQUADS } from '../data/squads'
import { GENERIC_MESSAGE } from '../lib/checkout'
import { formatBRL } from '../lib/format'
import { buildWhatsAppLink } from '../lib/whatsapp'
import { IconChevronLeft, IconChevronRight, IconWhatsApp } from './icons'
import { PlayerSticker } from './PlayerSticker'

/** Craques do carrossel, pelo número oficial da camisa. */
const FEATURED_PICKS: ReadonlyArray<readonly [iso: string, number: number]> = [
  ['fr', 10], // Mbappé
  ['es', 19], // Lamine Yamal
  ['gb-eng', 10], // Bellingham
  ['ar', 10], // Messi
  ['gb-eng', 9], // Kane
  ['fr', 11], // Dembélé
  ['es', 16], // Rodri
  ['ar', 22], // Lautaro
]

const AUTOPLAY_MS = 3500

/** Confete estático nas cores dos 4 semifinalistas + ouro. */
const CONFETTI: ReadonlyArray<
  readonly [top: string, left: string, size: number, color: string, rotate: number, opacity: number]
> = [
  ['8%', '6%', 8, '#e8c14a', 20, 0.55],
  ['16%', '30%', 5, '#4f9ad3', -14, 0.45],
  ['6%', '52%', 6, '#c8102e', 32, 0.4],
  ['12%', '78%', 9, '#12a150', -8, 0.5],
  ['24%', '92%', 5, '#e8c14a', 12, 0.5],
  ['30%', '4%', 6, '#2452c4', -24, 0.45],
  ['44%', '12%', 4, '#ffffff', 8, 0.3],
  ['52%', '3%', 7, '#c8102e', -30, 0.35],
  ['62%', '9%', 5, '#e8c14a', 16, 0.5],
  ['70%', '20%', 6, '#4f9ad3', -12, 0.4],
  ['82%', '7%', 8, '#12a150', 28, 0.4],
  ['86%', '38%', 5, '#ffffff', -18, 0.25],
  ['78%', '58%', 6, '#2452c4', 10, 0.35],
  ['88%', '80%', 8, '#e8c14a', -22, 0.5],
  ['58%', '90%', 5, '#c8102e', 18, 0.4],
  ['38%', '96%', 6, '#ffffff', -10, 0.25],
]

export function Hero() {
  const featured = FEATURED_PICKS.flatMap(([iso, number]) => {
    const squad = SQUADS.find((s) => s.iso === iso)
    const player = squad?.players.find((p) => p.number === number)
    return squad && player ? [{ squad, player }] : []
  })

  const [idx, setIdx] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused || featured.length < 2) return
    const timer = window.setInterval(
      () => setIdx((i) => (i + 1) % featured.length),
      AUTOPLAY_MS,
    )
    return () => window.clearInterval(timer)
  }, [paused, featured.length])

  const prev = () => setIdx((i) => (i - 1 + featured.length) % featured.length)
  const next = () => setIdx((i) => (i + 1) % featured.length)

  return (
    <section className="bg-hero-night relative overflow-hidden text-white">
      <HeroDecor />

      <div className="container-page relative grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:py-20">
        <div className="text-center lg:text-left">
          <p className="kicker text-gold-300">Copa 2026 · Semifinais em andamento</p>

          <h1 className="mt-4 text-4xl font-black tracking-tight text-balance sm:text-6xl">
            A Copa 2026 <span className="text-gradient-lime">Começa Aqui!</span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-lg text-white/70 text-pretty lg:mx-0">
            O destino definitivo para colecionadores. Figurinhas avulsas, Legends e variações
            raras. Você monta a lista aqui e a gente fecha tudo no WhatsApp.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <a href="#buscar" className="btn-primary">
              Buscar figurinhas
            </a>
            <a
              href={buildWhatsAppLink(GENERIC_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn border-2 border-white/25 px-6 py-3 text-sm text-white hover:border-white/50 hover:bg-white/10"
            >
              <IconWhatsApp className="size-4 text-grass-300" />
              Chamar no WhatsApp
            </a>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-x-10 gap-y-4 lg:justify-start">
            {(
              [
                ['48', 'seleções no catálogo'],
                ['980', 'figurinhas no álbum'],
                ['80', 'Legends e variações'],
              ] as const
            ).map(([value, label]) => (
              <div key={label} className="text-center lg:text-left">
                <p className="text-2xl font-black text-gold-300">{value}</p>
                <p className="text-xs font-semibold tracking-wide text-white/55 uppercase">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div
          className="relative mx-auto w-full max-w-md overflow-hidden rounded-3xl shadow-pop ring-1 ring-gold-500/40"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <img
            src="/hero-stadium.jpg"
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/75 via-black/30 to-black/85" />

          <div className="relative flex flex-col items-center gap-5 px-6 py-8 sm:py-10">
            <p className="text-center">
              <span className="block text-[11px] font-black tracking-[0.4em] text-gold-300 uppercase">
                World Cup 2026
              </span>
              <span className="mt-1.5 block text-sm font-bold text-white/90">
                Os craques da reta final
              </span>
            </p>

            <div className="relative w-44 sm:w-52" aria-live="polite">
              {featured.map(({ squad, player }, i) => (
                <div
                  key={`${squad.iso}-${player.number}`}
                  className={`transition-opacity duration-500 ${
                    i === idx
                      ? 'relative opacity-100'
                      : 'pointer-events-none absolute inset-0 opacity-0'
                  }`}
                  aria-hidden={i !== idx}
                >
                  <PlayerSticker squad={squad} player={player} eager />
                </div>
              ))}

              <button
                type="button"
                onClick={prev}
                aria-label="Craque anterior"
                className="btn absolute top-1/2 -left-12 hidden size-9 -translate-y-1/2 bg-white/15 text-white backdrop-blur-sm hover:bg-white/30 sm:flex"
              >
                <IconChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Próximo craque"
                className="btn absolute top-1/2 -right-12 hidden size-9 -translate-y-1/2 bg-white/15 text-white backdrop-blur-sm hover:bg-white/30 sm:flex"
              >
                <IconChevronRight className="size-5" />
              </button>
            </div>

            <div className="flex items-center gap-1.5">
              {featured.map(({ player, squad }, i) => (
                <button
                  key={`${squad.iso}-${player.number}`}
                  type="button"
                  onClick={() => setIdx(i)}
                  aria-label={`Ver ${player.name}`}
                  aria-current={i === idx}
                  className={`h-2 rounded-full transition-all ${
                    i === idx ? 'w-6 bg-gold-300' : 'w-2 bg-white/40 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>

            <p className="text-center text-sm font-bold text-gold-200">
              Qualquer jogador dos 4 semifinalistas por{' '}
              {formatBRL(SITE.prices.playerSemifinalist)}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

/** Decoração de fundo: feixes de refletor e confete nas cores das seleções. */
function HeroDecor() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      {/* feixes de refletor de estádio */}
      <div className="absolute -top-24 left-[16%] h-[38rem] w-28 -rotate-[16deg] bg-linear-to-b from-white/12 to-transparent blur-2xl" />
      <div className="absolute -top-24 left-[42%] h-[34rem] w-24 -rotate-[6deg] bg-linear-to-b from-grass-300/10 to-transparent blur-2xl" />
      <div className="absolute -top-24 right-[20%] h-[36rem] w-24 rotate-[14deg] bg-linear-to-b from-gold-300/12 to-transparent blur-2xl" />

      {/* confete nas cores dos semifinalistas */}
      {CONFETTI.map(([top, left, size, color, rotate, opacity], i) => (
        <span
          key={i}
          className="absolute rounded-[2px]"
          style={{
            top,
            left,
            width: size,
            height: size,
            background: color,
            opacity,
            transform: `rotate(${rotate}deg)`,
          }}
        />
      ))}
    </div>
  )
}
