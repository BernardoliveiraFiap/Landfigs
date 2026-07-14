export type Position = 'GOL' | 'DEF' | 'MEI' | 'ATA'

export type Confederation = 'UEFA' | 'CONMEBOL' | 'CONCACAF' | 'CAF' | 'AFC' | 'OFC'

export interface Team {
  namePt: string
  /** Código de bandeira do flagcdn (ex.: 'br', 'gb-eng'), também usado em /public/flags. */
  iso: string
  /** Grupo A–L na fase de grupos. */
  group: string
  confed: Confederation
}

export interface Player {
  /** Nome como aparece na camisa/figurinha. */
  name: string
  number: number
  position: Position
  club?: string
  /** Craque em destaque — recebe o tratamento foil dourado. */
  star?: boolean
}

export interface Squad {
  countryPt: string
  iso: string
  coach?: string
  /** Cores da seleção usadas no gradiente do card. */
  accent: string
  accentDeep: string
  players: readonly Player[]
}

export interface SpecialItem {
  id: string
  title: string
  subtitle: string
  price: number
  /** país-sede (mascotes) — usado para a bandeira e o fallback de imagem. */
  iso?: string
  /** slug do arquivo em /public/mascots, se houver imagem própria. */
  photo?: string
}

export type LegendVariant = 'regular' | 'bronze' | 'prata' | 'ouro'

export interface LegendPlayer {
  slug: string
  name: string
  countryPt: string
  iso: string
  /** nome do arquivo em /public/players (sem .jpg) */
  photoSlug: string
  /** formas alternativas do nome, para a busca casar (ex.: "Vini Jr", "CR7"). */
  aliases?: readonly string[]
}

export type CatalogKind = 'player-semi' | 'player-regular' | 'badge' | 'special' | 'legend'

export interface CatalogItem {
  id: string
  label: string
  sublabel: string
  price: number
  kind: CatalogKind
}
