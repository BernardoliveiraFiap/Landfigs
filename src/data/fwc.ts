import { SITE } from '../config/site'
import { deepFreeze } from '../lib/freeze'

export interface FwcCard {
  id: string
  number: number
  title: string
  subtitle: string
  price: number
}

/**
 * Cartas "FWC" — a seção especial de abertura do álbum (emblema, taça, mascotes,
 * pôster, bola oficial etc.). Vendidas pelo número, como o cliente pede.
 *
 * A numeração à venda e o preço de cada uma vêm de SITE.prices.fwc (fonte única
 * de verdade). O que exatamente cada número retrata não é afirmado no site: a
 * carta é comercializada pelo número FWC, e o detalhe se confirma no WhatsApp.
 */
function build(): FwcCard[] {
  return Object.entries(SITE.prices.fwc)
    .map(([n, price]): FwcCard => {
      const number = Number(n)
      return {
        id: `fwc:${number}`,
        number,
        title: `Carta FWC ${number}`,
        subtitle: 'Especial de abertura do álbum',
        price,
      }
    })
    .sort((a, b) => a.number - b.number)
}

export const FWC_CARDS: readonly FwcCard[] = deepFreeze(build())
