import { IconBadgeCheck, IconChat, IconShield, IconTruck } from './icons'

export function TrustBar() {
  const items = [
    {
      icon: IconShield,
      title: 'Compra fechada no WhatsApp',
      text: 'Nenhum pagamento acontece no site. Você combina tudo falando com a gente.',
    },
    {
      icon: IconBadgeCheck,
      title: 'Originais do álbum Panini',
      text: 'Figurinhas oficiais da coleção da Copa 2026, com foto real antes do envio.',
    },
    {
      icon: IconTruck,
      title: 'Envio para todo o Brasil',
      text: 'Envelope reforçado com plástico e papelão, direto na sua caixa de correio.',
    },
    {
      icon: IconChat,
      title: 'Atendimento de colecionador',
      text: 'Resposta rápida, listas sob medida e ajuda para fechar o álbum.',
    },
  ]

  return (
    <section aria-label="Por que comprar aqui" className="border-b border-line bg-paper">
      <div className="container-page grid gap-6 py-10 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(({ icon: Icon, title, text }) => (
          <div key={title} className="flex items-start gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-grass-50 text-grass-700">
              <Icon className="size-5" />
            </span>
            <div>
              <h3 className="text-sm font-extrabold">{title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-ink-soft">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
