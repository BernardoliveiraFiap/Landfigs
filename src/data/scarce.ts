import { slugify } from '../lib/slug'

/**
 * Jogadores comuns apontados como os mais difíceis de tirar nos pacotes
 * (menor taxa de aparição), por seleção. Quem entra aqui recebe
 * SITE.prices.playerScarce (R$3) no lugar do preço base.
 *
 * ESTÁ VAZIO DE PROPÓSITO. A pesquisa de 15/07/2026 (imprensa + comunidade +
 * Mercado Livre) não encontrou dado confiável de escassez de figurinha BASE
 * por seleção neste álbum: a raridade documentada é toda de Legends e
 * metalizadas, não de jogadores comuns. Preencher aqui sem fonte seria
 * inventar. A melhor fonte é a própria loja, que sabe quais nunca puxa.
 *
 * Para ativar: adicione [iso, ['Nome Exato', ...]] abaixo. Os nomes precisam
 * ser IDÊNTICOS aos de albumPlayers.ts / squads.ts (geram o id pl:<iso>:<slug>
 * ou sf:<iso>:<número>); catalog.ts valida em dev e quebra se algum não casar.
 *
 * Seleções com preço base próprio em playerRegularByIso (Brasil, RD do Congo,
 * México e Coreia do Sul) não entram: o base delas já é igual ou maior que R$3.
 * Semifinalistas também não: o preço base deles (R$4) já supera R$3.
 */
const RAW: ReadonlyArray<readonly [iso: string, players: readonly string[]]> = [
  // sem dado confiável em 15/07/2026 — preencher com a experiência de estoque da loja
]

export const SCARCE_PLAYER_IDS: ReadonlySet<string> = new Set(
  RAW.flatMap(([iso, players]) => players.map((name) => `pl:${iso}:${slugify(name)}`)),
)
