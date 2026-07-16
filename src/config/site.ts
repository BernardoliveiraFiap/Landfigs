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
    /**
     * Preço base do jogador comum avulso das demais seleções, seguindo a
     * tabela de jogadores comuns da MGA Figurinhas (mgafigurinhas.com.br,
     * conferida figurinha a figurinha em 16/07/2026).
     */
    playerRegular: 1.5,
    /**
     * Exceções ao base na mesma tabela: seleções cujo jogador comum avulso
     * custa mais no mercado pela procura. Semifinalistas não entram aqui
     * (têm regra própria); catalog.ts valida em dev.
     */
    playerRegularByIso: {
      br: 10.0, // Brasil
      cd: 5.0, // RD do Congo (figurinhas que menos saem nos pacotes)
      mx: 3.0, // México
      kr: 3.0, // Coreia do Sul
    },
    /**
     * Jogador comum difícil de tirar nos pacotes (menor taxa de aparição).
     * Quem entra nesta faixa está listado em src/data/scarce.ts.
     */
    playerScarce: 3.0,

    /**
     * Super craques com preço individual, por relevância atual e trajetória
     * (regra Cauê 16/07/2026): toda seleção tem pelo menos um super craque,
     * de R$10 a R$30; quem não está aqui é jogador comum e segue o preço base.
     * Chave = id de catálogo: sf:<iso>:<número> (semifinalistas) ou
     * pl:<iso>:<slug> (demais seleções). Tem prioridade sobre os preços base.
     */
    superCraques: {
      // ícones globais
      'sf:ar:10': 30.0, // Messi
      'pl:pt:cristiano-ronaldo': 30.0, // Cristiano Ronaldo
      'sf:fr:10': 20.0, // Mbappé
      // elite atual
      'pl:br:vini-jr': 15.0, // Vini Jr
      'sf:es:19': 15.0, // Lamine Yamal
      'pl:no:haaland': 15.0, // Haaland
      'sf:gb-eng:10': 15.0, // Bellingham
      // estrelas de primeira linha
      'sf:gb-eng:9': 12.0, // Kane
      'sf:fr:11': 12.0, // Dembélé
      'pl:eg:mohamed-salah': 12.0, // Salah
      'pl:de:wirtz': 12.0, // Wirtz
      'pl:br:raphinha': 12.0, // Raphinha
      'pl:br:neymar-jr': 12.0, // Neymar Jr (figurinha do Update Set)
      'pl:uy:federico-valverde': 12.0, // Valverde
      'pl:co:luis-diaz': 12.0, // Luis Díaz
      // o super craque de cada seleção
      'sf:es:16': 10.0, // Rodri
      'sf:es:20': 10.0, // Pedri
      'sf:ar:9': 10.0, // Julián Álvarez
      'sf:ar:22': 10.0, // Lautaro Martínez
      'sf:gb-eng:7': 10.0, // Saka
      'pl:hr:modric': 10.0, // Modrić
      'pl:kr:son-heung-min': 10.0, // Son Heung-min
      'pl:be:de-bruyne': 10.0, // De Bruyne
      'pl:be:doku': 10.0, // Doku
      'pl:de:musiala': 10.0, // Musiala
      'pl:pt:bruno-fernandes': 10.0, // Bruno Fernandes
      'pl:pt:vitinha': 10.0, // Vitinha
      'pl:nl:virgil-van-dijk': 10.0, // Van Dijk
      'pl:nl:frenkie-de-jong': 10.0, // Frenkie de Jong
      'pl:nl:memphis-depay': 10.0, // Memphis Depay
      'pl:no:degaard': 10.0, // Ødegaard (slug perde o Ø no normalize)
      'pl:se:gyokeres': 10.0, // Gyökeres
      'pl:se:isak': 10.0, // Isak
      'pl:tr:arda-guler': 10.0, // Arda Güler
      'pl:ma:hakimi': 10.0, // Hakimi
      'pl:eg:marmoush': 10.0, // Marmoush
      'pl:sn:sadio-mane': 10.0, // Sadio Mané
      'pl:dz:mahrez': 10.0, // Mahrez
      'pl:co:james-rodriguez': 10.0, // James Rodríguez
      'pl:ec:moises-caicedo': 10.0, // Moisés Caicedo
      'pl:ca:alphonso-davies': 10.0, // Alphonso Davies
      'pl:us:christian-pulisic': 10.0, // Pulisic
      'pl:mx:santiago-gimenez': 10.0, // Santiago Giménez
      'pl:jp:takefusa-kubo': 10.0, // Kubo
      'pl:ba:edin-dzeko': 10.0, // Džeko
      'pl:cz:schick': 10.0, // Schick
      'pl:ch:xhaka': 10.0, // Xhaka
      'pl:qa:akram-afif': 10.0, // Akram Afif
      'pl:za:lyle-foster': 10.0, // Lyle Foster
      'pl:ht:wilson-isidor': 10.0, // Wilson Isidor
      'pl:gb-sct:scott-mctominay': 10.0, // McTominay
      'pl:py:julio-enciso': 10.0, // Julio Enciso
      'pl:au:jackson-irvine': 10.0, // Jackson Irvine
      'pl:cw:tahith-chong': 10.0, // Tahith Chong
      'pl:ci:amad-diallo': 10.0, // Amad Diallo
      'pl:tn:hannibal-mejbri': 10.0, // Hannibal Mejbri
      'pl:ir:mehdi-taremi': 10.0, // Mehdi Taremi
      'pl:nz:chris-wood': 10.0, // Chris Wood
      'pl:sa:salem-al-dawsari': 10.0, // Salem Al Dawsari
      'pl:cv:ryan-mendes': 10.0, // Ryan Mendes
      'pl:iq:aymen-hussein': 10.0, // Aymen Hussein
      'pl:jo:musa-al-tamari': 10.0, // Musa Al-Tamari
      'pl:at:alaba': 10.0, // Alaba
      'pl:uz:abduqodir-husanov': 10.0, // Husanov
      'pl:cd:yoane-wissa': 10.0, // Yoane Wissa
      'pl:gh:semenyo': 10.0, // Semenyo
      'pl:pa:adalberto-carrasquilla': 10.0, // Carrasquilla
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
