import { useMemo, useState } from 'react'
import { CONFEDERATIONS, TEAMS } from '../data/teams'
import { SectionHeading } from './SectionHeading'
import { TeamCard } from './TeamCard'
import { IconSearch } from './icons'

function normalize(value: string): string {
  return value.toLowerCase().normalize('NFD').replace(/\p{M}/gu, '')
}

export function Catalog() {
  const [query, setQuery] = useState('')
  const [confed, setConfed] = useState<string | null>(null)

  const filtered = useMemo(() => {
    const q = normalize(query.trim())
    return TEAMS.filter(
      (t) =>
        (confed === null || t.confed === confed) &&
        (q === '' || normalize(t.namePt).includes(q) || t.group.toLowerCase() === q),
    )
  }, [query, confed])

  return (
    <section id="selecoes" className="border-b border-line bg-mist/50">
      <div className="container-page py-16 sm:py-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            kicker="Catálogo completo"
            title="Todas as 48 seleções do mundial"
            sub="Jogador avulso ou escudo de qualquer seleção. O número exato da figurinha você fecha com a gente no WhatsApp."
          />

          <label className="relative w-full max-w-xs">
            <span className="sr-only">Buscar seleção</span>
            <IconSearch className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-ink-soft" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              maxLength={40}
              placeholder="Buscar seleção…"
              className="w-full rounded-xl border-2 border-line bg-paper py-2.5 pr-4 pl-10 text-sm font-semibold placeholder:font-medium focus:border-grass-400"
            />
          </label>
        </div>

        <div
          className="mt-8 flex flex-wrap gap-6 border-b border-line pb-px"
          aria-label="Filtrar por confederação"
        >
          {[null, ...CONFEDERATIONS].map((c) => {
            const active = confed === c
            return (
              <button
                key={c ?? 'todas'}
                type="button"
                onClick={() => setConfed(c)}
                aria-pressed={active}
                className={`-mb-px border-b-2 pb-2.5 text-sm font-bold transition-colors ${
                  active
                    ? 'border-grass-600 text-ink'
                    : 'border-transparent text-ink-soft hover:text-ink'
                }`}
              >
                {c ?? 'Todas'}
              </button>
            )
          })}
        </div>

        {filtered.length > 0 ? (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((t) => (
              <TeamCard key={t.iso} team={t} />
            ))}
          </div>
        ) : (
          <p className="mt-12 text-center text-sm font-semibold text-ink-soft">
            Nenhuma seleção encontrada. Tente outro nome ou limpe o filtro.
          </p>
        )}
      </div>
    </section>
  )
}
