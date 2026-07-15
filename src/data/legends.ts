import { deepFreeze } from '../lib/freeze'
import type { LegendPlayer, LegendVariant } from './types'

/**
 * Panini Extra Stickers ("Legends") da Copa 2026 — checklist oficial:
 * 20 craques, cada um em 4 variações de cor (Regular/Roxa, Bronze, Prata e
 * Ouro, em ordem crescente de raridade; ~1 a cada 100 envelopes).
 */
export const LEGENDS: readonly LegendPlayer[] = deepFreeze([
  { slug: 'messi', name: 'Lionel Messi', countryPt: 'Argentina', iso: 'ar', photoSlug: 'ar-10', aliases: ['Messi'] },
  { slug: 'mbappe', name: 'Kylian Mbappé', countryPt: 'França', iso: 'fr', photoSlug: 'fr-10', aliases: ['Mbappe'] },
  { slug: 'yamal', name: 'Lamine Yamal', countryPt: 'Espanha', iso: 'es', photoSlug: 'es-19' },
  { slug: 'bellingham', name: 'Jude Bellingham', countryPt: 'Inglaterra', iso: 'gb-eng', photoSlug: 'gb-eng-10' },
  { slug: 'cristiano', name: 'Cristiano Ronaldo', countryPt: 'Portugal', iso: 'pt', photoSlug: 'legend-cristiano', aliases: ['CR7', 'Cristiano'] },
  { slug: 'vinicius', name: 'Vinícius Júnior', countryPt: 'Brasil', iso: 'br', photoSlug: 'legend-vinicius', aliases: ['Vini Jr', 'Vinicius', 'Vini'] },
  { slug: 'haaland', name: 'Erling Haaland', countryPt: 'Noruega', iso: 'no', photoSlug: 'legend-haaland' },
  { slug: 'salah', name: 'Mohamed Salah', countryPt: 'Egito', iso: 'eg', photoSlug: 'legend-salah' },
  { slug: 'modric', name: 'Luka Modrić', countryPt: 'Croácia', iso: 'hr', photoSlug: 'legend-modric', aliases: ['Modric'] },
  { slug: 'wirtz', name: 'Florian Wirtz', countryPt: 'Alemanha', iso: 'de', photoSlug: 'legend-wirtz' },
  { slug: 'son', name: 'Son Heung-min', countryPt: 'Coreia do Sul', iso: 'kr', photoSlug: 'legend-son', aliases: ['Son'] },
  { slug: 'hakimi', name: 'Achraf Hakimi', countryPt: 'Marrocos', iso: 'ma', photoSlug: 'legend-hakimi' },
  { slug: 'gakpo', name: 'Cody Gakpo', countryPt: 'Países Baixos', iso: 'nl', photoSlug: 'legend-gakpo' },
  { slug: 'doku', name: 'Jérémy Doku', countryPt: 'Bélgica', iso: 'be', photoSlug: 'legend-doku' },
  { slug: 'luis-diaz', name: 'Luis Díaz', countryPt: 'Colômbia', iso: 'co', photoSlug: 'legend-luis-diaz' },
  { slug: 'valverde', name: 'Federico Valverde', countryPt: 'Uruguai', iso: 'uy', photoSlug: 'legend-valverde' },
  { slug: 'caicedo', name: 'Moisés Caicedo', countryPt: 'Equador', iso: 'ec', photoSlug: 'legend-caicedo' },
  { slug: 'pulisic', name: 'Christian Pulisic', countryPt: 'Estados Unidos', iso: 'us', photoSlug: 'legend-pulisic' },
  { slug: 'davies', name: 'Alphonso Davies', countryPt: 'Canadá', iso: 'ca', photoSlug: 'legend-davies' },
  { slug: 'jimenez', name: 'Raúl Jiménez', countryPt: 'México', iso: 'mx', photoSlug: 'legend-jimenez' },
] satisfies LegendPlayer[])

export interface LegendVariantInfo {
  key: LegendVariant
  label: string
  /** cores do frame metálico do card */
  from: string
  via: string
  to: string
}

export const LEGEND_VARIANTS: readonly LegendVariantInfo[] = deepFreeze([
  { key: 'regular', label: 'Roxa', from: '#a78bfa', via: '#6d28d9', to: '#a78bfa' },
  { key: 'bronze', label: 'Bronze', from: '#d99a6c', via: '#8c5a2b', to: '#d99a6c' },
  { key: 'prata', label: 'Prata', from: '#e5e7eb', via: '#9ca3af', to: '#e5e7eb' },
  { key: 'ouro', label: 'Ouro', from: '#f2d878', via: '#c9a227', to: '#f2d878' },
] satisfies LegendVariantInfo[])
