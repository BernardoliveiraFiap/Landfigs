import { deepFreeze } from '../lib/freeze'
import type { Team } from './types'

/**
 * As 48 seleções classificadas para a Copa 2026, com os grupos do sorteio
 * oficial (fontes: fifa.com, olympics.com — pesquisa 13/07/2026).
 */
export const TEAMS: readonly Team[] = deepFreeze([
  { namePt: 'México', iso: 'mx', group: 'A', confed: 'CONCACAF' },
  { namePt: 'África do Sul', iso: 'za', group: 'A', confed: 'CAF' },
  { namePt: 'Coreia do Sul', iso: 'kr', group: 'A', confed: 'AFC' },
  { namePt: 'República Tcheca', iso: 'cz', group: 'A', confed: 'UEFA' },
  { namePt: 'Canadá', iso: 'ca', group: 'B', confed: 'CONCACAF' },
  { namePt: 'Bósnia e Herzegovina', iso: 'ba', group: 'B', confed: 'UEFA' },
  { namePt: 'Catar', iso: 'qa', group: 'B', confed: 'AFC' },
  { namePt: 'Suíça', iso: 'ch', group: 'B', confed: 'UEFA' },
  { namePt: 'Brasil', iso: 'br', group: 'C', confed: 'CONMEBOL' },
  { namePt: 'Marrocos', iso: 'ma', group: 'C', confed: 'CAF' },
  { namePt: 'Haiti', iso: 'ht', group: 'C', confed: 'CONCACAF' },
  { namePt: 'Escócia', iso: 'gb-sct', group: 'C', confed: 'UEFA' },
  { namePt: 'Estados Unidos', iso: 'us', group: 'D', confed: 'CONCACAF' },
  { namePt: 'Paraguai', iso: 'py', group: 'D', confed: 'CONMEBOL' },
  { namePt: 'Austrália', iso: 'au', group: 'D', confed: 'AFC' },
  { namePt: 'Turquia', iso: 'tr', group: 'D', confed: 'UEFA' },
  { namePt: 'Alemanha', iso: 'de', group: 'E', confed: 'UEFA' },
  { namePt: 'Curaçao', iso: 'cw', group: 'E', confed: 'CONCACAF' },
  { namePt: 'Costa do Marfim', iso: 'ci', group: 'E', confed: 'CAF' },
  { namePt: 'Equador', iso: 'ec', group: 'E', confed: 'CONMEBOL' },
  { namePt: 'Países Baixos', iso: 'nl', group: 'F', confed: 'UEFA' },
  { namePt: 'Japão', iso: 'jp', group: 'F', confed: 'AFC' },
  { namePt: 'Suécia', iso: 'se', group: 'F', confed: 'UEFA' },
  { namePt: 'Tunísia', iso: 'tn', group: 'F', confed: 'CAF' },
  { namePt: 'Bélgica', iso: 'be', group: 'G', confed: 'UEFA' },
  { namePt: 'Egito', iso: 'eg', group: 'G', confed: 'CAF' },
  { namePt: 'Irã', iso: 'ir', group: 'G', confed: 'AFC' },
  { namePt: 'Nova Zelândia', iso: 'nz', group: 'G', confed: 'OFC' },
  { namePt: 'Espanha', iso: 'es', group: 'H', confed: 'UEFA' },
  { namePt: 'Uruguai', iso: 'uy', group: 'H', confed: 'CONMEBOL' },
  { namePt: 'Arábia Saudita', iso: 'sa', group: 'H', confed: 'AFC' },
  { namePt: 'Cabo Verde', iso: 'cv', group: 'H', confed: 'CAF' },
  { namePt: 'França', iso: 'fr', group: 'I', confed: 'UEFA' },
  { namePt: 'Senegal', iso: 'sn', group: 'I', confed: 'CAF' },
  { namePt: 'Noruega', iso: 'no', group: 'I', confed: 'UEFA' },
  { namePt: 'Iraque', iso: 'iq', group: 'I', confed: 'AFC' },
  { namePt: 'Argentina', iso: 'ar', group: 'J', confed: 'CONMEBOL' },
  { namePt: 'Áustria', iso: 'at', group: 'J', confed: 'UEFA' },
  { namePt: 'Argélia', iso: 'dz', group: 'J', confed: 'CAF' },
  { namePt: 'Jordânia', iso: 'jo', group: 'J', confed: 'AFC' },
  { namePt: 'Portugal', iso: 'pt', group: 'K', confed: 'UEFA' },
  { namePt: 'Colômbia', iso: 'co', group: 'K', confed: 'CONMEBOL' },
  { namePt: 'Uzbequistão', iso: 'uz', group: 'K', confed: 'AFC' },
  { namePt: 'RD do Congo', iso: 'cd', group: 'K', confed: 'CAF' },
  { namePt: 'Inglaterra', iso: 'gb-eng', group: 'L', confed: 'UEFA' },
  { namePt: 'Croácia', iso: 'hr', group: 'L', confed: 'UEFA' },
  { namePt: 'Gana', iso: 'gh', group: 'L', confed: 'CAF' },
  { namePt: 'Panamá', iso: 'pa', group: 'L', confed: 'CONCACAF' },
] satisfies Team[])

export const CONFEDERATIONS = ['UEFA', 'CONMEBOL', 'CONCACAF', 'CAF', 'AFC', 'OFC'] as const
