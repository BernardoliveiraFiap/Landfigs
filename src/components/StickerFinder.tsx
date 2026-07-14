import { useMemo, useState } from 'react'
import { SITE } from '../config/site'
import { ALBUM_PLAYERS } from '../data/albumPlayers'
import { LEGENDS, LEGEND_VARIANTS } from '../data/legends'
import { MASCOTS_AND_TROPHY, STADIUMS } from '../data/specials'
import { SQUADS } from '../data/squads'
import { TEAMS } from '../data/teams'
import type { LegendVariant } from '../data/types'
import { formatBRL } from '../lib/format'
import { normalizeText } from '../lib/slug'
import { AddControl } from './AddControl'
import { SectionHeading } from './SectionHeading'
import { TeamCombobox } from './TeamCombobox'
import { IconSearch } from './icons'

type ColorKey = 'base' | LegendVariant

interface FinderEntry {
  id: string
  display: string
  detail: string
  iso: string | null
  color: ColorKey
  price: number
  haystack: string
  /** aparece na vitrine inicial, antes de qualquer busca */
  featured?: boolean
}

const TEAM_NAME = new Map(TEAMS.map((t) => [t.iso, t.namePt]))

/** Palavras de cor aceitas na busca livre (ex.: "neymar roxo", "messi ouro"). */
const COLOR_WORDS: Readonly<Record<string, ColorKey>> = {
  base: 'base',
  comum: 'base',
  normal: 'base',
  roxa: 'regular',
  roxo: 'regular',
  regular: 'regular',
  bronze: 'bronze',
  prata: 'prata',
  prateada: 'prata',
  prateado: 'prata',
  silver: 'prata',
  ouro: 'ouro',
  dourada: 'ouro',
  dourado: 'ouro',
  gold: 'ouro',
}

const COLOR_TABS: ReadonlyArray<readonly [ColorKey | null, string]> = [
  [null, 'Todas'],
  ['base', 'Base'],
  ['regular', 'Roxa'],
  ['bronze', 'Bronze'],
  ['prata', 'Prata'],
  ['ouro', 'Ouro'],
]

function buildIndex(): FinderEntry[] {
  const entries: FinderEntry[] = []

  for (const squad of SQUADS) {
    for (const p of squad.players) {
      entries.push({
        id: `sf:${squad.iso}:${p.number}`,
        display: `${p.name} #${p.number}`,
        detail: `${squad.countryPt} · semifinalista`,
        iso: squad.iso,
        color: 'base',
        price: SITE.prices.playerSemifinalist,
        haystack: normalizeText(`${p.name} ${squad.countryPt} ${p.position} semifinalista`),
        featured: p.star,
      })
    }
  }

  for (const ap of ALBUM_PLAYERS) {
    const team = TEAM_NAME.get(ap.iso) ?? ap.iso
    entries.push({
      id: ap.id,
      display: ap.name,
      detail: `${team} · figurinha base`,
      iso: ap.iso,
      color: 'base',
      price: SITE.prices.playerRegular,
      haystack: normalizeText(`${ap.name} ${team}`),
    })
  }

  for (const legend of LEGENDS) {
    for (const v of LEGEND_VARIANTS) {
      entries.push({
        id: `lg:${legend.slug}:${v.key}`,
        display: legend.name,
        detail: `Legend ${v.label} · ${legend.countryPt}`,
        iso: legend.iso,
        color: v.key,
        price: SITE.prices.legends[v.key],
        haystack: normalizeText(
          `${legend.name} ${(legend.aliases ?? []).join(' ')} ${legend.countryPt} legend extra sticker`,
        ),
        featured: v.key === 'regular',
      })
    }
  }

  for (const t of TEAMS) {
    entries.push({
      id: `tm:${t.iso}:badge`,
      display: `Escudo ${t.namePt}`,
      detail: 'figurinha metalizada do brasão',
      iso: t.iso,
      color: 'base',
      price: SITE.prices.badge,
      haystack: normalizeText(`escudo brasao ${t.namePt} metalizada`),
    })
  }

  for (const s of [...MASCOTS_AND_TROPHY, ...STADIUMS]) {
    entries.push({
      id: s.id,
      display: s.title,
      detail: s.subtitle,
      // mascotes carregam o país-sede (bandeira + filtro por seleção); taça e
      // estádios não têm iso e caem no losango dourado genérico
      iso: s.iso ?? null,
      color: 'base',
      price: s.price,
      haystack: normalizeText(`${s.title} ${s.subtitle} especial`),
    })
  }

  return entries
}

const INDEX = buildIndex()
const MAX_ROWS = 48

export function StickerFinder() {
  const [query, setQuery] = useState('')
  const [colorTab, setColorTab] = useState<ColorKey | null>(null)
  const [teamIso, setTeamIso] = useState('')

  const { rows, total, hasFilter, legendColorMiss } = useMemo(() => {
    const tokens = normalizeText(query.trim()).split(/\s+/).filter(Boolean)
    let textColor: ColorKey | null = null
    const nameTokens: string[] = []
    for (const t of tokens) {
      const c = COLOR_WORDS[t]
      if (c !== undefined) textColor = c
      else nameTokens.push(t)
    }
    const color = textColor ?? colorTab
    const hasFilter = nameTokens.length > 0 || color !== null || teamIso !== ''

    const matchesName = (e: FinderEntry) => nameTokens.every((tok) => e.haystack.includes(tok))
    const matchesTeam = (e: FinderEntry) => teamIso === '' || e.iso === teamIso

    let matches = INDEX.filter((e) => (color === null || e.color === color) && matchesTeam(e) && matchesName(e))

    // "neymar roxo" quando o jogador não é Legend: avisa e mostra a base
    let legendColorMiss = false
    if (matches.length === 0 && color !== null && color !== 'base' && nameTokens.length > 0) {
      const baseMatches = INDEX.filter((e) => e.color === 'base' && matchesTeam(e) && matchesName(e))
      if (baseMatches.length > 0) {
        legendColorMiss = true
        matches = baseMatches
      }
    }

    if (nameTokens.length > 0) {
      const first = nameTokens[0]
      matches = [...matches].sort((a, b) => {
        const aStarts = normalizeText(a.display).startsWith(first) ? 0 : 1
        const bStarts = normalizeText(b.display).startsWith(first) ? 0 : 1
        return aStarts - bStarts || a.display.localeCompare(b.display, 'pt-BR')
      })
    }

    const pool = hasFilter ? matches : INDEX.filter((e) => e.featured)
    return { rows: pool.slice(0, MAX_ROWS), total: hasFilter ? matches.length : pool.length, hasFilter, legendColorMiss }
  }, [query, colorTab, teamIso])

  return (
    <section id="buscar" className="border-b border-line bg-mist/50">
      <div className="container-page py-16 sm:py-20">
        <SectionHeading
          kicker="Busca no álbum"
          title="Encontre qualquer figurinha da coleção"
          sub={`${INDEX.length} figurinhas indexadas: jogadores das 48 seleções, escudos, Legends nas 4 cores, mascotes e estádios. Digite o nome e, se quiser, a cor. Exemplos: "vini jr ouro", "messi prata", "escudo brasil".`}
        />

        <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center">
          <label className="relative flex-1">
            <span className="sr-only">Buscar figurinha</span>
            <IconSearch className="absolute top-1/2 left-4 size-5 -translate-y-1/2 text-ink-soft" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              maxLength={60}
              placeholder="Jogador e cor. Ex.: vini jr ouro, kane, escudo brasil"
              className="w-full rounded-xl border-2 border-line bg-paper py-3.5 pr-4 pl-12 text-base font-semibold placeholder:font-medium focus:border-grass-400"
            />
          </label>

          <TeamCombobox value={teamIso} onChange={setTeamIso} />
        </div>

        <div
          className="no-scrollbar mt-5 flex gap-6 overflow-x-auto border-b border-line pb-px whitespace-nowrap"
          aria-label="Filtrar por cor"
        >
          {COLOR_TABS.map(([key, label]) => {
            const active = colorTab === key
            return (
              <button
                key={label}
                type="button"
                onClick={() => setColorTab(key)}
                aria-pressed={active}
                className={`-mb-px border-b-2 pb-2.5 text-sm font-bold transition-colors ${
                  active
                    ? 'border-grass-600 text-ink'
                    : 'border-transparent text-ink-soft hover:text-ink'
                }`}
              >
                {label}
              </button>
            )
          })}
        </div>

        <p className="mt-5 text-sm font-semibold text-ink-soft" aria-live="polite">
          {hasFilter
            ? `${total} ${total === 1 ? 'figurinha encontrada' : 'figurinhas encontradas'}${
                total > MAX_ROWS ? ` (mostrando ${MAX_ROWS}, refine a busca)` : ''
              }`
            : 'As mais buscadas. Digite um nome para vasculhar o álbum inteiro.'}
        </p>

        {legendColorMiss && (
          <p className="mt-2 text-sm font-semibold text-gold-700">
            Só os 20 craques das Legends têm as cores Roxa, Bronze, Prata e Ouro. Este jogador
            existe apenas na figurinha base. Veja quem tem variação na seção Legends.
          </p>
        )}

        {rows.length > 0 ? (
          <ul className="card mt-5 divide-y divide-line overflow-hidden">
            {rows.map((e) => (
              <li key={e.id} className="flex items-center gap-3 px-4 py-3">
                {e.iso ? (
                  <img
                    src={`/flags/${e.iso}.webp`}
                    alt=""
                    width={30}
                    loading="lazy"
                    className="shrink-0 rounded-[3px] ring-1 ring-ink/10"
                  />
                ) : (
                  <span className="h-5 w-[30px] shrink-0 rounded-[3px] bg-linear-to-br from-gold-200 to-gold-400" />
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold">{e.display}</p>
                  <p className="truncate text-xs text-ink-soft">{e.detail}</p>
                </div>
                <span className="shrink-0 text-sm font-extrabold">{formatBRL(e.price)}</span>
                <AddControl id={e.id} price={e.price} itemLabel={e.display} compact />
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-8 text-center text-sm font-semibold text-ink-soft">
            Nada encontrado. Confira a grafia ou tente só o sobrenome do jogador.
          </p>
        )}
      </div>
    </section>
  )
}
