import { useCart } from '../hooks/useCart'
import { GENERIC_MESSAGE } from '../lib/checkout'
import { buildWhatsAppLink } from '../lib/whatsapp'
import { IconWhatsApp } from './icons'

/** Botão flutuante do WhatsApp — some quando a barra do carrinho assume o rodapé. */
export function WhatsAppFab() {
  const { count } = useCart()
  if (count > 0) return null

  return (
    <a
      href={buildWhatsAppLink(GENERIC_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com a loja no WhatsApp"
      className="fixed right-4 bottom-4 z-40 flex size-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-pop transition-transform hover:scale-105"
    >
      <IconWhatsApp className="size-7" />
    </a>
  )
}
