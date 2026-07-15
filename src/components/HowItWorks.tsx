import { SectionHeading } from './SectionHeading'
import { IconShield } from './icons'

const STEPS = [
  {
    n: '1',
    title: 'Monte sua lista',
    text: 'Adicione jogadores, escudos e especiais. A lista fica salva no seu navegador, pode fechar e voltar depois.',
  },
  {
    n: '2',
    title: 'Envie no WhatsApp',
    text: 'Um clique gera a mensagem pronta com todos os itens e o total. Nada de formulário, cadastro ou senha.',
  },
  {
    n: '3',
    title: 'Receba em casa',
    text: 'Pagamento por Pix e envio pelos Correios combinados na conversa, com foto das suas figurinhas antes de postar.',
  },
] as const

export function HowItWorks() {
  return (
    <section id="como-funciona" className="border-b border-line bg-mist/50">
      <div className="container-page py-16 sm:py-20">
        <SectionHeading kicker="Como funciona" title="Do site pro seu álbum em 3 passos" />

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {STEPS.map((s) => (
            <article key={s.n} className="card p-6">
              <span className="flex size-10 items-center justify-center rounded-full bg-grass-600 text-lg font-black text-white">
                {s.n}
              </span>
              <h3 className="mt-4 font-extrabold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.text}</p>
            </article>
          ))}
        </div>

        <aside className="mx-auto mt-8 flex max-w-2xl items-start gap-3 rounded-2xl border border-grass-200 bg-grass-50 p-5">
          <IconShield className="mt-0.5 size-5 shrink-0 text-grass-700" />
          <p className="text-sm leading-relaxed text-grass-800">
            <strong>Por que não tem checkout no site?</strong> Segurança. Aqui você não digita
            cartão, senha nem endereço. O site não coleta nem armazena nenhum dado seu. A compra
            fecha no WhatsApp oficial da loja, onde você vê com quem está falando.
          </p>
        </aside>
      </div>
    </section>
  )
}
