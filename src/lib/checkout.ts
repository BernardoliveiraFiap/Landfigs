import { SITE } from '../config/site'
import { formatBRL } from './format'
import type { CartLine } from '../hooks/useCart'

/**
 * Monta a mensagem do pedido a partir das linhas do carrinho (que por sua vez
 * derivam do catálogo congelado). O total é recalculado aqui — nunca vem da UI.
 */
export function buildOrderMessage(lines: readonly CartLine[]): string {
  const total = lines.reduce((acc, l) => acc + l.price * l.qty, 0)
  const listed = lines.slice(0, SITE.checkout.maxListedRows)
  const remaining = lines.length - listed.length

  const rows = listed.map(
    (l) => `- ${l.qty}x ${l.label} (${l.sublabel}) = ${formatBRL(l.price * l.qty)}`,
  )
  if (remaining > 0) {
    rows.push(`- … e mais ${remaining} ${remaining === 1 ? 'item' : 'itens'} (detalho na conversa)`)
  }

  return [
    `Olá! Montei minha lista no site ${SITE.name}:`,
    '',
    ...rows,
    '',
    `Total dos itens: ${formatBRL(total)}`,
    'Podemos combinar pagamento e envio?',
  ].join('\n')
}

export const GENERIC_MESSAGE =
  'Olá! Vim do site e quero comprar figurinhas da Copa 2026. Pode me ajudar?'
