# craquebox.com


# CraqueBox — Figurinhas da Copa 2026

Landing page "sabor site" para venda de figurinhas avulsas da Copa 2026.
Sem gateway de pagamento: o visitante monta a lista e o pedido é fechado no
**WhatsApp oficial da loja**. 100% estático — feito para o plano gratuito da Vercel.

## Stack

- **Vite 7 + React 19 + TypeScript estrito**
- **Tailwind CSS v4** (tema branco, tokens em `src/styles/global.css`)
- Fonte **Outfit** self-hosted via `@fontsource-variable` (nenhum request externo em runtime)
- Bandeiras das 48 seleções em WebP local (`public/flags/`, ~109 KB)
- Fotos reais de 118 jogadores (`public/players/`, ~9 MB) via Wikimedia/Wikipedia
  (CC BY / CC BY-SA — crédito no rodapé); foto do estádio do hero por
  Krzysztof Popławski (CC BY 4.0, Wikimedia Commons)

## Rodando

```bash
npm install
npm run dev       # dev server
npm run build     # typecheck (tsc) + build de produção em dist/
npm run preview   # serve o build local
```

## Onde mudar preço, número do WhatsApp e limites

**Os valores em R$ vivem só em** [`src/config/site.ts`](src/config/site.ts)
(objeto congelado): jogador comum (`playerRegular` + exceções por seleção em
`playerRegularByIso`), escasso, semifinalista, tabela individual de
super-craques, escudo por faixa (raro/mediano/comum), cartas FWC, mascotes,
taça, estádios e a matriz de Legends (craque × cor). Também ali ficam
número do WhatsApp, limites do carrinho e throttle do checkout.

Duas classificações (quem entra em cada faixa, não o preço) ficam nos dados:
- **Faixa do escudo cromado de cada seleção:** campo `badgeTier` em
  [`src/data/teams.ts`](src/data/teams.ts).
- **Quais jogadores comuns são "difíceis de tirar" (R$3):** lista em
  [`src/data/scarce.ts`](src/data/scarce.ts) (hoje vazia — ver comentário no arquivo).

Quem resolve o preço final de cada item é [`src/data/catalog.ts`](src/data/catalog.ts),
na ordem: super-craque → escasso → semifinalista → base da seleção
(`playerRegularByIso` ou `playerRegular`). Ele valida em dev que todo
super-craque/escasso aponta para um jogador real do álbum e que as exceções
de base apontam para seleções reais fora das semifinais.

## Estrutura de dados

| Arquivo | Conteúdo |
| --- | --- |
| `src/data/teams.ts` | As 48 seleções, com grupo, confederação e faixa do escudo (`badgeTier`) |
| `src/data/squads.ts` | Elencos oficiais dos 4 semifinalistas (26 jogadores cada) |
| `src/data/albumPlayers.ts` | Jogadores base das outras 44 seleções |
| `src/data/scarce.ts` | Jogadores comuns "difíceis de tirar" (R$3) — hoje vazio |
| `src/data/legends.ts` | As 20 Panini Extra Stickers (Legends) e as 4 variações de cor |
| `src/data/fwc.ts` | Cartas FWC (seção de abertura), preço por número vindo de `site.ts` |
| `src/data/specials.ts` | Mascotes, taça dourada e os 16 estádios-sede |
| `src/data/catalog.ts` | Catálogo derivado — todo item vendável, com preço vindo de `site.ts` |

Tipos de figurinha à venda: jogadores dos 4 semifinalistas (um a um), jogador
avulso das demais 44 seleções, super-craques com preço próprio, escudos cromados
por faixa, cartas FWC, Legends nas variações Roxa/Bronze/Prata/Ouro, mascotes,
taça e estádios.

## Deploy na Vercel (plano gratuito)

1. **Commit e push de todo o projeto** — o remoto ainda só tem o README inicial;
   sem `package.json`/`src/` no GitHub a Vercel não tem o que buildar.
2. Na Vercel: **Add New → Project**, importe `BernardoliveiraFiap/Landfigs`.
   O preset **Vite** é detectado automaticamente (build `npm run build`, output `dist/`).
3. Os headers de segurança (CSP etc.) e o cache imutável de assets já estão em
   [`vercel.json`](vercel.json) — nada a configurar.
4. Recomendado no dashboard: ativar **Firewall / Attack Challenge Mode** em pico
   de tráfego suspeito (proteção DoS fica na borda, não no app).

## SEO e domínio

O SEO já está no código: meta tags, Open Graph/Twitter (com imagem de
compartilhamento em `public/og-image.jpg`), `robots.txt`, `sitemap.xml`,
`site.webmanifest` (ícones para "adicionar à tela inicial") e dados estruturados
JSON-LD (Organization + WebSite) em [`index.html`](index.html).

O domínio de produção é `craquebox.com`, já configurado em canonical, Open Graph,
JSON-LD, `robots.txt` e `sitemap.xml`. Se um dia mudar, faça um localizar-e-substituir
de `https://craquebox.com` nestes 3 arquivos:

- [`index.html`](index.html) (canonical, og:url, og:image, JSON-LD)
- [`public/robots.txt`](public/robots.txt) (linha `Sitemap:`)
- [`public/sitemap.xml`](public/sitemap.xml) (`<loc>`)

Depois de no ar, adicione a propriedade `craquebox.com` no Google Search Console e
envie o sitemap (`https://craquebox.com/sitemap.xml`).

## Segurança

Modelo de ameaça e mitigações em [`SECURITY.md`](SECURITY.md). Resumo: sem
backend, sem pagamento, sem coleta de dados; preços e número de redirecionamento
imutáveis em runtime; carrinho trata `localStorage` como entrada hostil.

## Avisos legais

- Site independente de colecionadores — não afiliado à FIFA nem à Panini.
- Fotos de jogadores e do estádio: Wikimedia Commons/Wikipedia, licenças
  CC BY / CC BY-SA (atribuição no rodapé do site). A arte oficial das
  figurinhas Panini não é reproduzida.
