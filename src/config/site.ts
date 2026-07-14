import { deepFreeze } from '../lib/freeze'

/**
 * ÚNICA FONTE DE VERDADE de comércio do site.
 *
 * Todos os preços e o número do WhatsApp existem SOMENTE aqui.
 * O objeto é congelado em runtime (deepFreeze) e imutável em compile-time
 * (`as const`), e todo link/mensagem é derivado destes valores no momento
 * do clique — nunca lido do DOM, de query string ou de localStorage.
 */
export const SITE = deepFreeze({
  name: 'CraqueBox',
  tagline: 'Figurinhas da Copa 2026',

  whatsapp: {
    /** Único lugar do projeto onde o número aparece. */
    number: '5511939429746',
  },

  prices: {
    /** Qualquer jogador de França, Espanha, Inglaterra ou Argentina. */
    playerSemifinalist: 4.0,
    /** Jogador avulso das demais 44 seleções (número combinado no WhatsApp). */
    playerRegular: 2.0,
    /** Escudo de qualquer seleção. */
    badge: 3.0,
    /** Figurinhas de estádio. */
    stadium: 3.0,
    /** Mascotes Maple, Zayu e Clutch. */
    mascot: 4.0,
    /** Figurinha dourada da taça. */
    foilTrophy: 6.0,
    /** Panini Extra Stickers (Legends) — 20 craques em 4 variações de cor. */
    legends: {
      regular: 149.0,
      bronze: 199.0,
      prata: 299.0,
      ouro: 499.0,
    },
  },

  cart: {
    maxQtyPerItem: 50,
    maxDistinctItems: 300,
    storageKey: 'landfigs.cart.v1',
  },

  checkout: {
    /** Intervalo mínimo entre aberturas do WhatsApp (anti spam de clique). */
    throttleMs: 2500,
    maxMessageChars: 6000,
    /** Listas maiores que isso são resumidas na mensagem ("+ N outros itens"). */
    maxListedRows: 60,
  },
} as const)

export type Site = typeof SITE
