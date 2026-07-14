import { TESTIMONIALS } from '../data/testimonials'
import { SectionHeading } from './SectionHeading'
import { IconStar } from './icons'

export function Testimonials() {
  return (
    <section id="depoimentos" className="border-b border-line">
      <div className="container-page py-16 sm:py-20">
        <SectionHeading
          kicker="Depoimentos"
          title="Quem já fechou o álbum com a gente"
          sub="Pedidos reais, fechados no WhatsApp e enviados para todo o Brasil."
        />

        <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="card mb-4 break-inside-avoid p-5">
              <div className="flex items-center gap-1" aria-label={`Nota ${t.rating} de 5`}>
                {Array.from({ length: 5 }, (_, i) => (
                  <IconStar
                    key={i}
                    className={`size-3.5 ${i < t.rating ? 'text-gold-400' : 'text-line'}`}
                  />
                ))}
              </div>
              <blockquote className="mt-3 text-sm leading-relaxed text-ink-soft">
                “{t.text}”
              </blockquote>
              <figcaption className="mt-4 flex items-center gap-2.5">
                <span className="flex size-9 items-center justify-center rounded-full bg-linear-to-br from-grass-500 to-grass-700 text-xs font-black text-white">
                  {t.name
                    .split(' ')
                    .map((p) => p[0])
                    .slice(0, 2)
                    .join('')}
                </span>
                <span>
                  <span className="block text-sm font-extrabold">{t.name}</span>
                  <span className="block text-xs text-ink-soft">{t.city}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
