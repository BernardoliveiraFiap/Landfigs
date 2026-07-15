import { deepFreeze } from '../lib/freeze'

/**
 * ÚNICA FONTE DE VERDADE de comércio do site.
 *
 * Todos os preços e o número do WhatsApp existem SOMENTE aqui.
 * O objeto é congelado em runtime (deepFreeze) e imutável em compile-time
 * (`as const`), e todo link/mensagem é derivado destes valores no momento
 * do clique — nunca lido do DOM, de query string ou de localStorage.
 *
 * Quem traduz estes valores em itens vendáveis é src/data/catalog.ts:
 * a ordem de resolução do preço de jogador está documentada lá.
 */
export const SITE = deepFreeze({
  name: 'CraqueBox',
  tagline: 'Figurinhas da Copa 2026',

  whatsapp: {
    /** Único lugar do projeto onde o número aparece. */
    number: '5511939429746',
  },

  prices: {
    /** Preço base de jogador de França, Espanha, Inglaterra ou Argentina. */
    playerSemifinalist: 4.0,
    /** Preço base do jogador avulso das demais 44 seleções (número combinado no WhatsApp). */
    playerRegular: 2.0,
    /**
     * Jogador comum difícil de tirar nos pacotes (menor taxa de aparição).
     * Quem entra nesta faixa está listado em src/data/scarce.ts.
     */
    playerScarce: 3.0,
    /** Qualquer jogador do Brasil. Exceção única: Vini Jr, tabelado em superCraques. */
    playerBrazil: 5.0,

    /**
     * Super-craques com preço individual, por relevância atual e trajetória.
     * Chave = id de catálogo: sf:<iso>:<número> (semifinalistas) ou
     * pl:<iso>:<slug> (demais seleções). Tem prioridade sobre os preços base.
     */
    superCraques: {
      // ícones globais
      'sf:ar:10': 30.0, // Messi
      'pl:pt:cristiano-ronaldo': 30.0, // Cristiano Ronaldo
      'sf:fr:10': 25.0, // Mbappé
      'sf:es:19': 25.0, // Lamine Yamal
      'pl:br:vini-jr': 20.0, // Vini Jr (exceção fixada da regra do Brasil)
      // elite atual
      'pl:no:haaland': 15.0, // Haaland
      'sf:gb-eng:10': 15.0, // Bellingham
      'sf:gb-eng:9': 12.0, // Kane
      'sf:fr:11': 12.0, // Dembélé
      'pl:eg:mohamed-salah': 12.0, // Salah
      'pl:hr:modric': 12.0, // Modrić
      'pl:de:wirtz': 12.0, // Wirtz
      // estrelas consagradas e em alta
      'sf:es:16': 10.0, // Rodri
      'sf:es:20': 10.0, // Pedri
      'sf:ar:9': 10.0, // Julián Álvarez
      'sf:ar:22': 10.0, // Lautaro Martínez
      'pl:de:musiala': 10.0, // Musiala
      'pl:kr:son-heung-min': 10.0, // Son Heung-min
      'pl:be:de-bruyne': 10.0, // De Bruyne
      'pl:ma:hakimi': 10.0, // Hakimi
      'pl:tr:arda-guler': 10.0, // Arda Güler
      'pl:se:gyokeres': 10.0, // Gyökeres
      'pl:se:isak': 10.0, // Isak
      // destaques
      'sf:gb-eng:7': 8.0, // Saka
      'sf:ar:23': 8.0, // Dibu Martínez
      'sf:ar:24': 8.0, // Enzo Fernández
      'sf:ar:20': 8.0, // Mac Allister
      'sf:es:17': 8.0, // Nico Williams
      'pl:pt:bruno-fernandes': 8.0, // Bruno Fernandes
      'pl:pt:rafael-leao': 8.0, // Rafael Leão
      'pl:nl:gakpo': 8.0, // Gakpo
      'pl:nl:frenkie-de-jong': 8.0, // Frenkie de Jong
      'pl:nl:virgil-van-dijk': 8.0, // Van Dijk
      'pl:sn:sadio-mane': 8.0, // Sadio Mané
      'pl:co:luis-diaz': 8.0, // Luis Díaz
      'pl:co:james-rodriguez': 8.0, // James Rodríguez
      'pl:uy:federico-valverde': 8.0, // Valverde
      'pl:ec:moises-caicedo': 8.0, // Moisés Caicedo
      'pl:ca:alphonso-davies': 8.0, // Alphonso Davies
      'pl:us:christian-pulisic': 8.0, // Pulisic
      'pl:eg:marmoush': 8.0, // Marmoush
      'pl:uy:darwin-nunez': 6.0, // Darwin Núñez
      'pl:ca:jonathan-david': 6.0, // Jonathan David
      'pl:mx:santiago-gimenez': 6.0, // Santiago Giménez
      'pl:mx:raul-jimenez': 6.0, // Raúl Jiménez
      'pl:mx:guillermo-ochoa': 6.0, // Ochoa
      'pl:jp:takefusa-kubo': 6.0, // Kubo
      'pl:dz:mahrez': 6.0, // Mahrez
      'pl:be:doku': 6.0, // Doku
      'pl:ba:edin-dzeko': 6.0, // Džeko
    },

    /**
     * Escudo cromado, por faixa de raridade. A faixa de cada seleção está
     * em src/data/teams.ts (badgeTier).
     */
    badge: {
      raro: 20.0,
      mediano: 15.0,
      comum: 10.0,
    },

    /** Figurinhas de estádio. */
    stadium: 3.0,
    /** Mascotes Maple, Zayu e Clutch. */
    mascot: 4.0,
    /** Figurinha dourada da taça. */
    foilTrophy: 6.0,

    /** Cartas FWC (seção de abertura do álbum), preço por número. */
    fwc: {
      3: 40.0,
      4: 40.0,
      5: 40.0,
      6: 45.0,
      7: 60.0,
      8: 55.0,
      17: 25.0,
      18: 25.0,
    },

    /**
     * Panini Extra Stickers (Legends) — 20 craques em 4 variações de cor
     * (Roxa/regular, Bronze, Prata e Ouro, em ordem crescente de raridade).
     *
     * A ROXA segue as faixas de relevância definidas pelo Cauê (15/07/2026):
     * top R$130 a 150, médios R$110 a 120, menos relevantes R$80 a 100.
     * Bronze, Prata e Ouro seguem a raridade da cor (mais rara = mais cara),
     * com o craque puxando o topo, ancorados no mercado de revenda BR.
     */
    legends: {
      // top (Roxa 130 a 150)
      messi: { regular: 150.0, bronze: 279.0, prata: 449.0, ouro: 999.0 },
      cristiano: { regular: 150.0, bronze: 279.0, prata: 449.0, ouro: 999.0 },
      mbappe: { regular: 150.0, bronze: 229.0, prata: 339.0, ouro: 649.0 },
      vinicius: { regular: 145.0, bronze: 229.0, prata: 339.0, ouro: 649.0 },
      yamal: { regular: 145.0, bronze: 229.0, prata: 339.0, ouro: 649.0 },
      haaland: { regular: 140.0, bronze: 229.0, prata: 339.0, ouro: 649.0 },
      bellingham: { regular: 135.0, bronze: 229.0, prata: 339.0, ouro: 649.0 },
      salah: { regular: 130.0, bronze: 229.0, prata: 339.0, ouro: 649.0 },
      // médios (Roxa 110 a 120)
      modric: { regular: 120.0, bronze: 199.0, prata: 299.0, ouro: 499.0 },
      son: { regular: 120.0, bronze: 199.0, prata: 299.0, ouro: 499.0 },
      wirtz: { regular: 115.0, bronze: 199.0, prata: 299.0, ouro: 499.0 },
      hakimi: { regular: 115.0, bronze: 199.0, prata: 299.0, ouro: 499.0 },
      valverde: { regular: 110.0, bronze: 199.0, prata: 299.0, ouro: 499.0 },
      'luis-diaz': { regular: 110.0, bronze: 199.0, prata: 299.0, ouro: 499.0 },
      // menos relevantes (Roxa 80 a 100)
      gakpo: { regular: 100.0, bronze: 199.0, prata: 299.0, ouro: 499.0 },
      doku: { regular: 95.0, bronze: 199.0, prata: 299.0, ouro: 499.0 },
      pulisic: { regular: 90.0, bronze: 199.0, prata: 299.0, ouro: 499.0 },
      caicedo: { regular: 90.0, bronze: 199.0, prata: 299.0, ouro: 499.0 },
      davies: { regular: 85.0, bronze: 199.0, prata: 299.0, ouro: 499.0 },
      jimenez: { regular: 80.0, bronze: 199.0, prata: 299.0, ouro: 499.0 },
    },
  },

  cart: {
    maxQtyPerItem: 50,
    maxDistinctItems: 300,
    storageKey: 'landfigs.cart.v1',
  },

  checkout: {
    /** Intervalo mínimo entre aberturas do WhatsApp (anti spam de clique). */
    throttleMs: 2500,
    maxMessageChars: 6000,
    /** Listas maiores que isso são resumidas na mensagem ("+ N outros itens"). */
    maxListedRows: 60,
  },
} as const)

export type Site = typeof SITE
