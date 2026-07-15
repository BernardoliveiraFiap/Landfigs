import { SITE } from '../config/site'
import { priceOf } from '../data/catalog'
import { SEMIFINALIST_ISOS } from '../data/squads'
import type { Team } from '../data/types'
import { formatBRL } from '../lib/format'
import { AddControl } from './AddControl'
import { IconStar } from './icons'

/** Rótulo da faixa de raridade do escudo cromado. */
const BADGE_TIER_LABEL: Readonly<Record<Team['badgeTier'], string>> = {
  raro: 'raro, quase não sai nos pacotes',
  mediano: 'procurado',
  comum: 'brasão metalizado',
}

export function TeamCard({ team }: { team: Team }) {
  const isSemi = SEMIFINALIST_ISOS.has(team.iso)
  const isBrazil = team.iso === 'br'

  return (
    <article className={`card flex flex-col gap-4 p-4 ${isSemi ? 'border-gold-300' : ''}`}>
      <div className="flex items-center gap-3">
        <img
          src={`/flags/${team.iso}.webp`}
          alt={`Bandeira: ${team.namePt}`}
          width={44}
          loading="lazy"
          className="rounded-md ring-1 ring-ink/10"
        />
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-extrabold">{team.namePt}</h3>
          <p className="mt-0.5 text-xs font-semibold text-ink-soft">
            Grupo {team.group} · {team.confed}
          </p>
        </div>
        {isSemi && (
          <span className="flex shrink-0 items-center gap-1 text-[10px] font-black tracking-widest text-gold-600 uppercase">
            <IconStar className="size-3.5 text-gold-500" />
            Semi
          </span>
        )}
      </div>

      <ul className="mt-auto divide-y divide-line rounded-xl border border-line">
        {isSemi ? (
          <li className="flex items-center justify-between gap-2 px-3 py-2.5">
            <div>
              <p className="text-sm font-bold">
                Jogadores a partir de {formatBRL(SITE.prices.playerSemifinalist)}
              </p>
              <p className="text-xs text-ink-soft">os 26 convocados, um a um</p>
            </div>
            <a
              href="#semifinalistas"
              className="btn shrink-0 bg-gold-300 px-3 py-1.5 text-xs text-ink hover:bg-gold-200"
            >
              Ver elenco
            </a>
          </li>
        ) : (
          <li className="flex items-center justify-between gap-2 px-3 py-2.5">
            <div>
              <p className="text-sm font-bold">Jogador avulso</p>
              <p className="text-xs text-ink-soft">
                {isBrazil ? 'qualquer um do elenco (Vini Jr à parte)' : 'nº combinado no WhatsApp'}
              </p>
            </div>
            <AddControl
              id={`tm:${team.iso}:player`}
              price={priceOf(`tm:${team.iso}:player`)}
              itemLabel={`Jogador avulso da seleção: ${team.namePt}`}
            />
          </li>
        )}
        <li className="flex items-center justify-between gap-2 px-3 py-2.5">
          <div>
            <p className="text-sm font-bold">Escudo cromado</p>
            <p className="text-xs text-ink-soft">{BADGE_TIER_LABEL[team.badgeTier]}</p>
          </div>
          <AddControl
            id={`tm:${team.iso}:badge`}
            price={priceOf(`tm:${team.iso}:badge`)}
            itemLabel={`Escudo da seleção: ${team.namePt}`}
          />
        </li>
      </ul>
    </article>
  )
}
