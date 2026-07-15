import { SITE } from '../config/site'
import { GENERIC_MESSAGE } from '../lib/checkout'
import { buildWhatsAppLink } from '../lib/whatsapp'
import { IconWhatsApp } from './icons'

const NAV = [
  ['#buscar', 'Buscar figurinhas'],
  ['#semifinalistas', 'Semifinalistas'],
  ['#legends', 'Legends'],
  ['#selecoes', 'Todas as seleções'],
  ['#especiais', 'Especiais'],
  ['#depoimentos', 'Depoimentos'],
  ['#faq', 'Perguntas frequentes'],
] as const

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="container-page grid gap-10 py-14 md:grid-cols-3">
        <div>
          <p className="flex items-center gap-2.5">
            <img src="/favicon.svg" alt="" className="size-9" />
            <span className="leading-tight">
              <span className="block text-xl font-black tracking-tight">
                Craque<span className="text-grass-300">Box</span>
              </span>
              <span className="block text-[10px] font-bold tracking-[0.24em] text-white/50 uppercase">
                {SITE.tagline}
              </span>
            </span>
          </p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
            Figurinhas avulsas do mundial para você fechar o álbum sem depender da sorte dos
            envelopes, e sem pagar por repetida.
          </p>
        </div>

        <nav aria-label="Mapa do site">
          <h3 className="text-sm font-black tracking-widest text-white/60 uppercase">Navegue</h3>
          <ul className="mt-4 space-y-2.5 text-sm font-semibold">
            {NAV.map(([href, label]) => (
              <li key={href}>
                <a href={href} className="text-white/85 transition-colors hover:text-white">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-sm font-black tracking-widest text-white/60 uppercase">
            Atendimento
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-white/70">
            Todo pedido é fechado no WhatsApp oficial da loja, com atendimento humano.
          </p>
          <a
            href={buildWhatsAppLink(GENERIC_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn mt-4 bg-grass-600 px-5 py-2.5 text-sm text-white hover:bg-grass-500"
          >
            <IconWhatsApp className="size-4" />
            Chamar no WhatsApp
          </a>
        </div>
      </div>

      <div className="border-t border-white/10 py-6 text-center text-xs text-white/55">
        <p>
          © 2026 {SITE.name}. Site independente de colecionadores, não afiliado à FIFA nem à
          Panini.
        </p>
        <p className="mt-1">
          Nenhum pagamento é processado neste site: o checkout acontece 100% no WhatsApp.
        </p>
        <p className="mt-1">
          Fotos de jogadores e estádio: Wikimedia Commons (CC BY / CC BY-SA). Estádio por
          Krzysztof Popławski.
        </p>
      </div>
    </footer>
  )
}
