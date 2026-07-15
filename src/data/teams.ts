import { deepFreeze } from '../lib/freeze'
import type { Team } from './types'

/**
 * As 48 seleções classificadas para a Copa 2026, com os grupos do sorteio
 * oficial (fontes: fifa.com, olympics.com — pesquisa 13/07/2026).
 *
 * badgeTier = faixa de preço do escudo cromado (valores em SITE.prices.badge):
 * - raro: os 6 escudos que menos saem nos pacotes (fixados pela loja).
 * - mediano: potências e seleções de alta procura.
 * - comum: demais seleções.
 */
export const TEAMS: readonly Team[] = deepFreeze([
  { namePt: 'México', iso: 'mx', group: 'A', confed: 'CONCACAF', badgeTier: 'mediano' },
  { namePt: 'África do Sul', iso: 'za', group: 'A', confed: 'CAF', badgeTier: 'comum' },
  { namePt: 'Coreia do Sul', iso: 'kr', group: 'A', confed: 'AFC', badgeTier: 'comum' },
  { namePt: 'República Tcheca', iso: 'cz', group: 'A', confed: 'UEFA', badgeTier: 'raro' },
  { namePt: 'Canadá', iso: 'ca', group: 'B', confed: 'CONCACAF', badgeTier: 'mediano' },
  { namePt: 'Bósnia e Herzegovina', iso: 'ba', group: 'B', confed: 'UEFA', badgeTier: 'raro' },
  { namePt: 'Catar', iso: 'qa', group: 'B', confed: 'AFC', badgeTier: 'comum' },
  { namePt: 'Suíça', iso: 'ch', group: 'B', confed: 'UEFA', badgeTier: 'comum' },
  { namePt: 'Brasil', iso: 'br', group: 'C', confed: 'CONMEBOL', badgeTier: 'raro' },
  { namePt: 'Marrocos', iso: 'ma', group: 'C', confed: 'CAF', badgeTier: 'mediano' },
  { namePt: 'Haiti', iso: 'ht', group: 'C', confed: 'CONCACAF', badgeTier: 'comum' },
  { namePt: 'Escócia', iso: 'gb-sct', group: 'C', confed: 'UEFA', badgeTier: 'comum' },
  { namePt: 'Estados Unidos', iso: 'us', group: 'D', confed: 'CONCACAF', badgeTier: 'mediano' },
  { namePt: 'Paraguai', iso: 'py', group: 'D', confed: 'CONMEBOL', badgeTier: 'comum' },
  { namePt: 'Austrália', iso: 'au', group: 'D', confed: 'AFC', badgeTier: 'comum' },
  { namePt: 'Turquia', iso: 'tr', group: 'D', confed: 'UEFA', badgeTier: 'raro' },
  { namePt: 'Alemanha', iso: 'de', group: 'E', confed: 'UEFA', badgeTier: 'mediano' },
  { namePt: 'Curaçao', iso: 'cw', group: 'E', confed: 'CONCACAF', badgeTier: 'comum' },
  { namePt: 'Costa do Marfim', iso: 'ci', group: 'E', confed: 'CAF', badgeTier: 'comum' },
  { namePt: 'Equador', iso: 'ec', group: 'E', confed: 'CONMEBOL', badgeTier: 'comum' },
  { namePt: 'Países Baixos', iso: 'nl', group: 'F', confed: 'UEFA', badgeTier: 'mediano' },
  { namePt: 'Japão', iso: 'jp', group: 'F', confed: 'AFC', badgeTier: 'mediano' },
  { namePt: 'Suécia', iso: 'se', group: 'F', confed: 'UEFA', badgeTier: 'raro' },
  { namePt: 'Tunísia', iso: 'tn', group: 'F', confed: 'CAF', badgeTier: 'comum' },
  { namePt: 'Bélgica', iso: 'be', group: 'G', confed: 'UEFA', badgeTier: 'mediano' },
  { namePt: 'Egito', iso: 'eg', group: 'G', confed: 'CAF', badgeTier: 'comum' },
  { namePt: 'Irã', iso: 'ir', group: 'G', confed: 'AFC', badgeTier: 'comum' },
  { namePt: 'Nova Zelândia', iso: 'nz', group: 'G', confed: 'OFC', badgeTier: 'comum' },
  { namePt: 'Espanha', iso: 'es', group: 'H', confed: 'UEFA', badgeTier: 'mediano' },
  { namePt: 'Uruguai', iso: 'uy', group: 'H', confed: 'CONMEBOL', badgeTier: 'mediano' },
  { namePt: 'Arábia Saudita', iso: 'sa', group: 'H', confed: 'AFC', badgeTier: 'comum' },
  { namePt: 'Cabo Verde', iso: 'cv', group: 'H', confed: 'CAF', badgeTier: 'comum' },
  { namePt: 'França', iso: 'fr', group: 'I', confed: 'UEFA', badgeTier: 'mediano' },
  { namePt: 'Senegal', iso: 'sn', group: 'I', confed: 'CAF', badgeTier: 'mediano' },
  { namePt: 'Noruega', iso: 'no', group: 'I', confed: 'UEFA', badgeTier: 'comum' },
  { namePt: 'Iraque', iso: 'iq', group: 'I', confed: 'AFC', badgeTier: 'comum' },
  { namePt: 'Argentina', iso: 'ar', group: 'J', confed: 'CONMEBOL', badgeTier: 'mediano' },
  { namePt: 'Áustria', iso: 'at', group: 'J', confed: 'UEFA', badgeTier: 'comum' },
  { namePt: 'Argélia', iso: 'dz', group: 'J', confed: 'CAF', badgeTier: 'comum' },
  { namePt: 'Jordânia', iso: 'jo', group: 'J', confed: 'AFC', badgeTier: 'comum' },
  { namePt: 'Portugal', iso: 'pt', group: 'K', confed: 'UEFA', badgeTier: 'mediano' },
  { namePt: 'Colômbia', iso: 'co', group: 'K', confed: 'CONMEBOL', badgeTier: 'mediano' },
  { namePt: 'Uzbequistão', iso: 'uz', group: 'K', confed: 'AFC', badgeTier: 'mediano' },
  { namePt: 'RD do Congo', iso: 'cd', group: 'K', confed: 'CAF', badgeTier: 'raro' },
  { namePt: 'Inglaterra', iso: 'gb-eng', group: 'L', confed: 'UEFA', badgeTier: 'mediano' },
  { namePt: 'Croácia', iso: 'hr', group: 'L', confed: 'UEFA', badgeTier: 'mediano' },
  { namePt: 'Gana', iso: 'gh', group: 'L', confed: 'CAF', badgeTier: 'comum' },
  { namePt: 'Panamá', iso: 'pa', group: 'L', confed: 'CONCACAF', badgeTier: 'comum' },
] satisfies Team[])

export const CONFEDERATIONS = ['UEFA', 'CONMEBOL', 'CONCACAF', 'CAF', 'AFC', 'OFC'] as const
