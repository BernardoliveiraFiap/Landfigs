import { TESTIMONIALS } from '../data/testimonials'
import type { Testimonial } from '../data/testimonials'
import { SectionHeading } from './SectionHeading'
import { IconStar } from './icons'

/**
 * Depoimentos em duas esteiras contínuas de sentidos opostos, no mesmo
 * padrão do FlagsMarquee: conteúdo duplicado, track anima -50% em loop e
 * pausa no hover. Cards com largura fixa e rodapé alinhado na base, para a
 * linha ficar uniforme independente do tamanho do texto.
 */

const HALF = Math.ceil(TESTIMONIALS.length / 2)
const ROWS: ReadonlyArray<readonly Testimonial[]> = [
  TESTIMONIALS.slice(0, HALF),
  TESTIMONIALS.slice(HALF),
]

function initialsOf(name: string): string {
  return name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <figure className="card relative flex w-72 shrink-0 flex-col p-5 transition-colors hover:border-grass-300 sm:w-80">
      <span
        aria-hidden
        className="pointer-events-none absolute top-1 right-4 text-6xl leading-none font-black text-grass-100 select-none"
      >
        “
      </span>
      <div className="flex items-center gap-1" aria-label={`Nota ${t.rating} de 5`}>
        {Array.from({ length: 5 }, (_, i) => (
          <IconStar
            key={i}
            className={`size-3.5 ${i < t.rating ? 'text-gold-400' : 'text-line'}`}
          />
        ))}
      </div>
      <blockquote className="relative mt-3 mb-4 text-sm leading-relaxed text-ink-soft">
        {t.text}
      </blockquote>
      <figcaption className="mt-auto flex items-center gap-2.5 border-t border-line/70 pt-3.5">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-grass-500 to-grass-700 text-xs font-black text-white">
          {initialsOf(t.name)}
        </span>
        <span className="min-w-0">
          <span className="block truncate text-sm font-extrabold">{t.name}</span>
          <span className="block text-xs text-ink-soft">{t.city}</span>
        </span>
      </figcaption>
    </figure>
  )
}

function TestimonialsRow({
  items,
  reverse = false,
}: {
  items: readonly Testimonial[]
  reverse?: boolean
}) {
  return (
    <div className="marquee overflow-x-clip">
      <div
        className="marquee-track items-stretch"
        style={{
          animationDuration: reverse ? '88s' : '76s',
          animationDirection: reverse ? 'reverse' : undefined,
        }}
      >
        {[0, 1].map((copy) => (
          <div key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-stretch gap-4 pr-4">
            {items.map((t) => (
              <TestimonialCard key={t.name} t={t} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export function Testimonials() {
  return (
    <section id="depoimentos" className="border-b border-line">
      <div className="container-page pt-16 sm:pt-20">
        <SectionHeading
          kicker="Depoimentos"
          title="Quem já fechou o álbum com a gente"
          sub="Pedidos reais, fechados no WhatsApp e enviados para todo o Brasil."
        />
      </div>

      <div className="relative mt-10 space-y-4 pb-16 sm:pb-20">
        <TestimonialsRow items={ROWS[0]} />
        <TestimonialsRow items={ROWS[1]} reverse />
        <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-linear-to-r from-paper to-transparent sm:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-linear-to-l from-paper to-transparent sm:w-24" />
      </div>
    </section>
  )
}
