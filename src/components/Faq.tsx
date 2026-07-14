import { SITE } from '../config/site'
import { formatBRL } from '../lib/format'
import { SectionHeading } from './SectionHeading'
import { IconPlus } from './icons'

const semiPrice = formatBRL(SITE.prices.playerSemifinalist)

const FAQS: ReadonlyArray<readonly [string, string]> = [
  [
    'Como funciona a compra?',
    'Você monta a lista aqui no site, clica em "Fechar pedido no WhatsApp" e a mensagem chega pronta pra gente, com itens e total. Na conversa combinamos o pagamento (Pix) e o envio. Simples assim.',
  ],
  [
    'As figurinhas são originais?',
    'Sim, 100% originais da coleção oficial Panini da Copa 2026. Mandamos foto real das suas figurinhas antes do envio, é só pedir.',
  ],
  [
    'O que são as Legends (Extra Stickers)?',
    'São 20 craques fora da numeração do álbum, encontrados em média a cada 100 envelopes. Cada um existe em 4 variações de cor: Roxa, Bronze, Prata e Ouro, em ordem crescente de raridade. Por serem raras, o estoque muda rápido: a gente confirma disponibilidade na hora, na conversa.',
  ],
  [
    'Posso pedir números específicos?',
    'Pode e deve! Para os 4 semifinalistas, cada jogador já está listado no site com o número oficial. Para as demais seleções, adicione "jogador avulso" e mande na conversa os números que faltam no seu álbum.',
  ],
  [
    'Quanto custa o frete?',
    'Depende do seu CEP: calculamos na hora pelo WhatsApp. As figurinhas viajam em envelope reforçado com plástico e papelão.',
  ],
  [
    `Por que jogadores dos semifinalistas custam ${semiPrice}?`,
    `França, Espanha, Inglaterra e Argentina estão na reta final e são as figurinhas mais procuradas do momento. O preço é fixo e tabelado: qualquer jogador dessas 4 seleções sai por ${semiPrice}, do goleiro reserva ao camisa 10.`,
  ],
  [
    'É seguro comprar por aqui?',
    'O site não processa pagamento nem pede dados: ele só monta sua lista e abre o WhatsApp oficial da loja. Você nunca digita cartão, senha ou endereço aqui.',
  ],
]

export function Faq() {
  return (
    <section id="faq" className="border-b border-line bg-mist/50">
      <div className="container-page py-16 sm:py-20">
        <SectionHeading kicker="FAQ" title="Perguntas frequentes" />

        <div className="mt-10 max-w-2xl space-y-3">
          {FAQS.map(([q, a]) => (
            <details key={q} className="faq card group px-5 py-4">
              <summary className="flex items-center justify-between gap-4 font-bold">
                {q}
                <IconPlus className="faq-icon size-4 shrink-0 text-grass-600 transition-transform" />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
