import { SITE } from '../config/site'
import type { Player, Squad } from '../data/types'
import { formatBRL } from '../lib/format'
import { AddControl } from './AddControl'
import { IconStar } from './icons'
import { PlayerPhoto } from './PlayerPhoto'

interface Props {
  squad: Squad
  player: Player
  /** carrega a foto sem lazy-loading (para o carrossel do hero) */
  eager?: boolean
}

/**
 * Figurinha de jogador com foto real — craques (star) ganham moldura
 * dourada com brilho foil sobre a foto.
 */
export function PlayerSticker({ squad, player, eager = false }: Props) {
  const id = `sf:${squad.iso}:${player.number}`
  const price = SITE.prices.playerSemifinalist
  const frame = player.star
    ? 'bg-linear-to-br from-gold-300 via-gold-500 to-gold-200 shadow-pop'
    : 'bg-line shadow-card'

  return (
    <article className={`rounded-2xl p-[3px] ${frame}`}>
      <div className="flex h-full flex-col overflow-hidden rounded-[13px] bg-paper">
        <div
          className={`relative aspect-[3/4] ${player.star ? 'foil' : ''}`}
          style={{
            background: `linear-gradient(165deg, ${squad.accent} 0%, ${squad.accentDeep} 100%)`,
          }}
        >
          <PlayerPhoto slug={`${squad.iso}-${player.number}`} alt="" eager={eager} />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/85 via-black/35 to-transparent" />

          <div className="absolute top-2 left-2 flex items-center gap-1.5">
            <img
              src={`/flags/${squad.iso}.webp`}
              alt=""
              width={22}
              loading={eager ? 'eager' : 'lazy'}
              className="rounded-[3px] shadow-sm"
            />
            <span className="text-xs font-black text-white drop-shadow-md">#{player.number}</span>
          </div>
          {player.star && (
            <IconStar className="absolute top-2 right-2 size-4 text-gold-300 drop-shadow-md" />
          )}

          <div className="absolute inset-x-0 bottom-0 p-2.5">
            <h3
              className="truncate text-sm font-extrabold tracking-wide text-white uppercase"
              title={player.name}
            >
              {player.name}
            </h3>
            <p className="truncate text-[10px] font-semibold text-white/80">
              {player.position}
              {player.club ? ` · ${player.club}` : ''}
            </p>
          </div>
        </div>

        <div className="z-[2] flex items-center justify-between gap-1 bg-paper px-2.5 py-2">
          <span className="text-sm font-extrabold">{formatBRL(price)}</span>
          <AddControl
            id={id}
            price={price}
            itemLabel={`${player.name} (${squad.countryPt})`}
            compact
          />
        </div>
      </div>
    </article>
  )
}
