import { SITE } from '../config/site'
import { deepFreeze } from '../lib/freeze'
import { SQUADS, SEMIFINALIST_ISOS } from './squads'
import { TEAMS } from './teams'
import { SPECIALS } from './specials'
import { LEGENDS, LEGEND_VARIANTS } from './legends'
import { ALBUM_PLAYERS } from './albumPlayers'
import { SCARCE_PLAYER_IDS } from './scarce'
import { FWC_CARDS } from './fwc'
import type { CatalogItem, LegendVariant } from './types'

/**
 * Catálogo derivado — todo item vendável nasce aqui, com preço vindo
 * exclusivamente de SITE.prices. O carrinho só aceita ids presentes neste
 * catálogo e o total é sempre recalculado a partir dele no momento do clique.
 *
 * Preço de jogador, em ordem de prioridade:
 * 1. SITE.prices.superCraques[id]  (craque com preço individual)
 * 2. SITE.prices.playerBrazil      (qualquer jogador do Brasil)
 * 3. SITE.prices.playerScarce      (difícil de tirar — data/scarce.ts)
 * 4. playerSemifinalist / playerRegular (preço base)
 */

const SUPER_CRAQUES: ReadonlyMap<string, number> = new Map(
  Object.entries(SITE.prices.superCraques),
)

const LEGEND_PRICES: ReadonlyMap<string, Readonly<Record<LegendVariant, number>>> = new Map(
  Object.entries(SITE.prices.legends),
)

export function playerPrice(id: string, iso: string): number {
  const craque = SUPER_CRAQUES.get(id)
  if (craque !== undefined) return craque
  if (iso === 'br') return SITE.prices.playerBrazil
  if (SCARCE_PLAYER_IDS.has(id)) return SITE.prices.playerScarce
  return SEMIFINALIST_ISOS.has(iso) ? SITE.prices.playerSemifinalist : SITE.prices.playerRegular
}

export function legendPrice(slug: string, variant: LegendVariant): number {
  const prices = LEGEND_PRICES.get(slug)
  if (prices === undefined) throw new Error(`Legend sem preço em SITE.prices.legends: ${slug}`)
  return prices[variant]
}

/** Rótulo curto da faixa do jogador, usado nos sublabels do catálogo. */
function playerBadgeLabel(id: string, iso: string): string {
  if (SUPER_CRAQUES.has(id)) return ' · super-craque'
  if (iso === 'br') return ''
  if (SCARCE_PLAYER_IDS.has(id)) return ' · difícil de tirar'
  return ''
}

function buildCatalog(): CatalogItem[] {
  const items: CatalogItem[] = []

  for (const squad of SQUADS) {
    for (const p of squad.players) {
      const id = `sf:${squad.iso}:${p.number}`
      items.push({
        id,
        label: `${p.name} #${p.number}`,
        sublabel: `${squad.countryPt} · semifinalista${SUPER_CRAQUES.has(id) ? ' · super-craque' : ''}`,
        price: playerPrice(id, squad.iso),
        kind: 'player-semi',
      })
    }
  }

  const teamName = new Map(TEAMS.map((t) => [t.iso, t.namePt]))
  for (const ap of ALBUM_PLAYERS) {
    items.push({
      id: ap.id,
      label: ap.name,
      sublabel: `${teamName.get(ap.iso) ?? ap.iso} · figurinha base${playerBadgeLabel(ap.id, ap.iso)}`,
      price: playerPrice(ap.id, ap.iso),
      kind: 'player-regular',
    })
  }

  for (const team of TEAMS) {
    if (!SEMIFINALIST_ISOS.has(team.iso)) {
      items.push({
        id: `tm:${team.iso}:player`,
        label: `Jogador avulso · ${team.namePt}`,
        sublabel: 'nº da figurinha combinado no WhatsApp',
        price: team.iso === 'br' ? SITE.prices.playerBrazil : SITE.prices.playerRegular,
        kind: 'player-regular',
      })
    }
    items.push({
      id: `tm:${team.iso}:badge`,
      label: `Escudo · ${team.namePt}`,
      sublabel: `Grupo ${team.group} · cromado ${team.badgeTier}`,
      price: SITE.prices.badge[team.badgeTier],
      kind: 'badge',
    })
  }

  for (const special of SPECIALS) {
    items.push({
      id: special.id,
      label: special.title,
      sublabel: special.subtitle,
      price: special.price,
      kind: 'special',
    })
  }

  for (const card of FWC_CARDS) {
    items.push({
      id: card.id,
      label: card.title,
      sublabel: card.subtitle,
      price: card.price,
      kind: 'fwc',
    })
  }

  for (const legend of LEGENDS) {
    for (const variant of LEGEND_VARIANTS) {
      items.push({
        id: `lg:${legend.slug}:${variant.key}`,
        label: `${legend.name} · Legend ${variant.label}`,
        sublabel: `Extra Sticker · ${legend.countryPt} · confirmar estoque`,
        price: legendPrice(legend.slug, variant.key),
        kind: 'legend',
      })
    }
  }

  return items
}

const list = deepFreeze(buildCatalog())

export const CATALOG: ReadonlyMap<string, CatalogItem> = new Map(list.map((i) => [i.id, i]))
export const CATALOG_IDS: ReadonlySet<string> = new Set(CATALOG.keys())

/** Preço de um item pelo id do catálogo — única forma dos componentes lerem preço. */
export function priceOf(id: string): number {
  const item = CATALOG.get(id)
  if (item === undefined) throw new Error(`Item fora do catálogo: ${id}`)
  return item.price
}

// Sanidade em dev: todo super-craque e todo escasso precisam apontar para um
// item real do catálogo (nome digitado errado geraria um id órfão e o preço
// nunca seria aplicado).
if (import.meta.env.DEV) {
  for (const id of SUPER_CRAQUES.keys()) {
    if (!CATALOG.has(id)) throw new Error(`superCraques aponta para id inexistente: ${id}`)
  }
  for (const id of SCARCE_PLAYER_IDS) {
    if (!CATALOG.has(id)) throw new Error(`scarce.ts aponta para id inexistente: ${id}`)
  }
  for (const legend of LEGENDS) {
    if (!LEGEND_PRICES.has(legend.slug)) {
      throw new Error(`Legend sem preço em SITE.prices.legends: ${legend.slug}`)
    }
  }
}
