import { TEAMS } from '../data/teams'

/**
 * Faixa das 48 seleções em rolagem contínua. O conteúdo é renderizado duas
 * vezes e o track anima -50% em loop — sem emenda visível. Pausa no hover.
 */
export function FlagsMarquee() {
  return (
    <div className="marquee relative overflow-hidden border-b border-line bg-mist/70 py-3">
      <div className="marquee-track" aria-label="As 48 seleções classificadas">
        {[0, 1].map((copy) => (
          <div key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center gap-7 pr-7">
            {TEAMS.map((t) => (
              <div key={t.iso} className="flex shrink-0 items-center gap-2">
                <img
                  src={`/flags/${t.iso}.webp`}
                  alt=""
                  width={26}
                  className="rounded-[3px] ring-1 ring-ink/10"
                />
                <span className="text-xs font-semibold whitespace-nowrap text-ink-soft">
                  {t.namePt}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-linear-to-r from-mist to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-linear-to-l from-mist to-transparent" />
    </div>
  )
}
