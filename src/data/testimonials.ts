import { deepFreeze } from '../lib/freeze'

export interface Testimonial {
  name: string
  city: string
  text: string
  /** 1 a 5 */
  rating: number
}

/**
 * ATENÇÃO: depoimentos de exemplo, para dar forma à seção.
 * Substitua pelos depoimentos reais dos seus clientes (copie do WhatsApp,
 * com autorização) antes de divulgar o site — prova social falsa derruba
 * a confiança que o resto da página constrói.
 */
export const TESTIMONIALS: readonly Testimonial[] = deepFreeze([
  {
    name: 'Rafael M.',
    city: 'São Paulo · SP',
    text: 'Faltavam 9 figurinhas da Argentina pra fechar a página e achei todas aqui. Mandei a lista pelo site, paguei no Pix e chegou em 4 dias com papelão e plastiquinho. Perfeito.',
    rating: 5,
  },
  {
    name: 'Camila R.',
    city: 'Curitiba · PR',
    text: 'Pedi foto das figurinhas antes de pagar e mandaram na hora, sem enrolação. A Legend Prata do Modrić veio impecável.',
    rating: 5,
  },
  {
    name: 'João Pedro',
    city: 'Belo Horizonte · MG',
    text: 'O buscador do site salvou meu fim de semana: joguei os números que faltavam no WhatsApp e em dez minutos o pedido estava fechado.',
    rating: 5,
  },
  {
    name: 'Ana Beatriz',
    city: 'Recife · PE',
    text: 'Comprei o elenco completo da Espanha pro meu filho. Veio tudo certinho, conferido figurinha por figurinha na conversa, e ainda combinamos o Lamine Yamal à parte.',
    rating: 5,
  },
  {
    name: 'Diego S.',
    city: 'Porto Alegre · RS',
    text: 'Atendimento de colecionador de verdade: me avisaram que uma repetida que eu ia comprar não valia a pena e sugeriram troca. Honestidade rara.',
    rating: 5,
  },
  {
    name: 'Larissa F.',
    city: 'Salvador · BA',
    text: 'Frete saiu mais barato do que eu esperava e o envelope veio reforçado. Só não dou nota 10 porque a Legend Ouro que eu queria estava esgotada.',
    rating: 4,
  },
  {
    name: 'Thiago N.',
    city: 'Goiânia · GO',
    text: 'Fechei os 16 estádios e os 3 mascotes de uma vez. Chegou antes do prazo e com brinde de repetida pra troca. Voltarei na final!',
    rating: 5,
  },
  {
    name: 'Mariana L.',
    city: 'Rio de Janeiro · RJ',
    text: 'Site simples do jeito certo: sem cadastro, sem cartão, tudo no WhatsApp. Me senti segura comprando pela primeira vez.',
    rating: 5,
  },
  {
    name: 'Felipe A.',
    city: 'Fortaleza · CE',
    text: 'Os R$ 4 por jogador dos semifinalistas valem muito: montei quase todo o meio-campo da França sem pesar no bolso. Já garanti os meus antes da final.',
    rating: 5,
  },
  {
    name: 'Bruno C.',
    city: 'Florianópolis · SC',
    text: 'Coleciono desde 2010 e é a primeira loja que me manda a foto da figurinha com a data do dia. Confiança total, recomendo de olhos fechados.',
    rating: 5,
  },
] satisfies Testimonial[])
