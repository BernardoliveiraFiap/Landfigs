import { SITE } from '../config/site'
import { deepFreeze } from '../lib/freeze'
import { SQUADS, SEMIFINALIST_ISOS } from './squads'
import { TEAMS } from './teams'
import { SPECIALS } from './specials'
import { LEGENDS, LEGEND_VARIANTS } from './legends'
import { ALBUM_PLAYERS } from './albumPlayers'
import type { CatalogItem } from './types'

/**
 * Catálogo derivado — todo item vendável nasce aqui, com preço vindo
 * exclusivamente de SITE.prices. O carrinho só aceita ids presentes neste
 * catálogo e o total é sempre recalculado a partir dele no momento do clique.
 */
function buildCatalog(): CatalogItem[] {
  const items: CatalogItem[] = []

  for (const squad of SQUADS) {
    for (const p of squad.players) {
      items.push({
        id: `sf:${squad.iso}:${p.number}`,
        label: `${p.name} #${p.number}`,
        sublabel: `${squad.countryPt} · semifinalista`,
        price: SITE.prices.playerSemifinalist,
        kind: 'player-semi',
      })
    }
  }

  const teamName = new Map(TEAMS.map((t) => [t.iso, t.namePt]))
  for (const ap of ALBUM_PLAYERS) {
    items.push({
      id: ap.id,
      label: ap.name,
      sublabel: `${teamName.get(ap.iso) ?? ap.iso} · figurinha base`,
      price: SITE.prices.playerRegular,
      kind: 'player-regular',
    })
  }

  for (const team of TEAMS) {
    if (!SEMIFINALIST_ISOS.has(team.iso)) {
      items.push({
        id: `tm:${team.iso}:player`,
        label: `Jogador avulso · ${team.namePt}`,
        sublabel: 'nº da figurinha combinado no WhatsApp',
        price: SITE.prices.playerRegular,
        kind: 'player-regular',
      })
    }
    items.push({
      id: `tm:${team.iso}:badge`,
      label: `Escudo · ${team.namePt}`,
      sublabel: `Grupo ${team.group}`,
      price: SITE.prices.badge,
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

  for (const legend of LEGENDS) {
    for (const variant of LEGEND_VARIANTS) {
      items.push({
        id: `lg:${legend.slug}:${variant.key}`,
        label: `${legend.name} · Legend ${variant.label}`,
        sublabel: `Extra Sticker · ${legend.countryPt} · confirmar estoque`,
        price: SITE.prices.legends[variant.key],
        kind: 'legend',
      })
    }
  }

  return items
}

const list = deepFreeze(buildCatalog())

export const CATALOG: ReadonlyMap<string, CatalogItem> = new Map(list.map((i) => [i.id, i]))
export const CATALOG_IDS: ReadonlySet<string> = new Set(CATALOG.keys())
