import { SITE } from '../config/site'
import { deepFreeze } from '../lib/freeze'
import type { SpecialItem } from './types'

/**
 * Mascotes oficiais da Copa 2026 + taça dourada.
 * As imagens oficiais dos mascotes são protegidas pela FIFA e não são
 * embutidas no projeto; cada card usa a bandeira do país-sede. Se você tiver
 * licença para usar a arte oficial, coloque o arquivo em
 * public/mascots/<photo>.jpg que ele passa a aparecer no lugar da bandeira.
 */
export const MASCOTS_AND_TROPHY: readonly SpecialItem[] = deepFreeze([
  {
    id: 'sp:mascote-maple',
    title: 'Maple',
    subtitle: 'Mascote do Canadá · alce goleiro',
    price: SITE.prices.mascot,
    iso: 'ca',
    photo: 'maple',
  },
  {
    id: 'sp:mascote-zayu',
    title: 'Zayu',
    subtitle: 'Mascote do México · onça atacante',
    price: SITE.prices.mascot,
    iso: 'mx',
    photo: 'zayu',
  },
  {
    id: 'sp:mascote-clutch',
    title: 'Clutch',
    subtitle: 'Mascote dos EUA · águia meio-campista',
    price: SITE.prices.mascot,
    iso: 'us',
    photo: 'clutch',
  },
  {
    id: 'sp:taca-dourada',
    title: 'Taça FIFA (dourada)',
    subtitle: 'Figurinha especial metalizada',
    price: SITE.prices.foilTrophy,
  },
] satisfies SpecialItem[])

/** Os 16 estádios-sede da Copa 2026. */
export const STADIUMS: readonly SpecialItem[] = deepFreeze(
  (
    [
      ['sp:estadio-metlife', 'MetLife Stadium', 'Nova York/Nova Jersey · palco da final'],
      ['sp:estadio-att', 'AT&T Stadium', 'Dallas · palco de semifinal'],
      ['sp:estadio-mercedes', 'Mercedes-Benz Stadium', 'Atlanta · palco de semifinal'],
      ['sp:estadio-hardrock', 'Hard Rock Stadium', 'Miami'],
      ['sp:estadio-sofi', 'SoFi Stadium', 'Los Angeles'],
      ['sp:estadio-levis', "Levi's Stadium", 'São Francisco'],
      ['sp:estadio-lumen', 'Lumen Field', 'Seattle'],
      ['sp:estadio-arrowhead', 'Arrowhead Stadium', 'Kansas City'],
      ['sp:estadio-nrg', 'NRG Stadium', 'Houston'],
      ['sp:estadio-lincoln', 'Lincoln Financial Field', 'Filadélfia'],
      ['sp:estadio-gillette', 'Gillette Stadium', 'Boston'],
      ['sp:estadio-azteca', 'Estádio Azteca', 'Cidade do México'],
      ['sp:estadio-akron', 'Estádio Akron', 'Guadalajara'],
      ['sp:estadio-bbva', 'Estádio BBVA', 'Monterrey'],
      ['sp:estadio-bmo', 'BMO Field', 'Toronto'],
      ['sp:estadio-bcplace', 'BC Place', 'Vancouver'],
    ] as const
  ).map(
    ([id, title, subtitle]): SpecialItem => ({
      id,
      title,
      subtitle,
      price: SITE.prices.stadium,
    }),
  ),
)

export const SPECIALS: readonly SpecialItem[] = deepFreeze([
  ...MASCOTS_AND_TROPHY,
  ...STADIUMS,
])
