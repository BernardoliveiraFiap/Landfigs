import { SITE } from '../config/site'

const WA_ORIGIN = 'https://wa.me'

/**
 * Monta o link wa.me a partir do número congelado em SITE.
 * A função não aceita número por parâmetro de propósito: não deve existir
 * caminho no código em que o destino do redirecionamento seja variável.
 */
export function buildWhatsAppLink(message: string): string {
  const text = message.slice(0, SITE.checkout.maxMessageChars)
  return `${WA_ORIGIN}/${SITE.whatsapp.number}?text=${encodeURIComponent(text)}`
}

let lastOpenedAt = 0

/**
 * Abre o WhatsApp em nova aba com throttle contra spam de cliques
 * (clique duplo, macro, botão travado). Retorna false quando bloqueado.
 */
export function openWhatsApp(message: string): boolean {
  const now = Date.now()
  if (now - lastOpenedAt < SITE.checkout.throttleMs) return false
  lastOpenedAt = now

  const win = window.open(buildWhatsAppLink(message), '_blank', 'noopener,noreferrer')
  if (win) win.opener = null
  return true
}
