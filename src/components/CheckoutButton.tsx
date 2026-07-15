import { useState } from 'react'
import { SITE } from '../config/site'
import { useCart } from '../hooks/useCart'
import { buildOrderMessage } from '../lib/checkout'
import { openWhatsApp } from '../lib/whatsapp'
import { IconWhatsApp } from './icons'

/**
 * Botão de checkout: monta a mensagem a partir do catálogo congelado no
 * momento do clique e abre o WhatsApp com throttle (o botão trava por alguns
 * segundos para impedir spam de cliques/aberturas em massa).
 */
export function CheckoutButton({ className = '' }: { className?: string }) {
  const { lines } = useCart()
  const [pending, setPending] = useState(false)

  function handleCheckout() {
    if (pending || lines.length === 0) return
    const opened = openWhatsApp(buildOrderMessage(lines))
    if (opened) {
      setPending(true)
      window.setTimeout(() => setPending(false), SITE.checkout.throttleMs)
    }
  }

  return (
    <button
      type="button"
      onClick={handleCheckout}
      disabled={pending || lines.length === 0}
      className={`btn bg-grass-600 text-white hover:bg-grass-700 ${className}`}
    >
      <IconWhatsApp className="size-4" />
      {pending ? 'Abrindo WhatsApp…' : 'Fechar pedido no WhatsApp'}
    </button>
  )
}
