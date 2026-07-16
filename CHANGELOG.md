# Changelog

Mudanças relevantes do CraqueBox. Datas em AAAA-MM-DD.

## 2026-07-16

### Preços (nova regra da tabela)

- **Toda seleção tem pelo menos um super craque** com preço individual, agora na
  faixa R$10 a R$30 (67 entradas em `SITE.prices.superCraques`): Messi e
  Cristiano Ronaldo R$30, Mbappé R$20, Vini Jr, Lamine Yamal, Haaland e
  Bellingham R$15, estrelas de primeira linha R$12 e o craque de cada uma das
  demais seleções R$10. A antiga faixa de destaques (R$6 a 8) acabou: ou o
  jogador é super craque, ou é comum.
- **Jogador comum segue a tabela de comuns do mercado de avulsas (conferida em
  16/07/2026):** base R$1,50, com exceções por seleção em
  `SITE.prices.playerRegularByIso`: Brasil R$10, RD do Congo R$5, México e
  Coreia do Sul R$3. O campo `playerBrazil` (R$5) foi removido.
- **Semifinalistas seguem em R$4** (França, Espanha, Inglaterra e Argentina),
  com exceção dos craques tabelados.
- Nova ordem de resolução em `catalog.ts`: super-craque → escasso →
  semifinalista → base da seleção, com validação em dev dos isos das exceções.
- FAQ de preços reescrita para a regra nova.

### Interface

- Depoimentos deixaram o grid irregular (colunas com alturas quebradas) e
  viraram duas esteiras contínuas de sentidos opostos, no padrão da faixa de
  seleções: pausa no hover, cards de altura uniforme com rodapé alinhado,
  aspas decorativa e realce sutil na borda.

## 2026-07-15

### Preços (revisão da tabela)

- **Escudos cromados por faixa de raridade:** raro R$20 (Brasil, Turquia, Suécia,
  República Tcheca, Bósnia e Herzegovina, RD do Congo), mediano R$15, comum R$10.
  A faixa de cada seleção fica em `src/data/teams.ts` (`badgeTier`).
- **Jogadores:** base comum R$2, semifinalista R$4, Brasil R$5 (exceção única do
  Vini Jr, R$20). Faixa "difícil de tirar" R$3 disponível em `src/data/scarce.ts`
  (vazia por ora: não há dado público de escassez de figurinha base por seleção).
- **Super-craques** com preço individual (R$6 a R$30), em `SITE.prices.superCraques`.
- **Cartas FWC** vendidas por número (3/4/5 = R$40, 6 = R$45, 7 = R$60, 8 = R$55,
  17 e 18 = R$25), em `src/data/fwc.ts` e na seção Especiais.
- **Legends** viraram matriz craque × cor. Roxa por relevância (top R$130 a 150,
  médios R$110 a 120, menos relevantes R$80 a 100); Bronze, Prata e Ouro por
  raridade de cor.
- Resolução central de preço em `src/data/catalog.ts` (`priceOf`), na ordem
  super-craque → Brasil → escasso → base, com validação em dev de ids órfãos.

### Correções

- Preço da figurinha no carrossel do hero estava invisível (herdava a cor branca
  da seção); agora com cor explícita (`text-ink`), visível no mobile e no desktop.

### SEO

- Domínio de produção apontado para `craquebox.com` em canonical, Open Graph,
  Twitter, JSON-LD, `robots.txt` e `sitemap.xml` (antes era o placeholder
  `craquebox.vercel.app`).
