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

**Um único arquivo:** [`src/config/site.ts`](src/config/site.ts).
Preços (incluindo as 4 variações de Legends), número do WhatsApp, limites do
carrinho e throttle do checkout vivem somente ali (objeto congelado).
Nenhum outro arquivo contém esses valores.

## Estrutura de dados

| Arquivo | Conteúdo |
| --- | --- |
| `src/data/teams.ts` | As 48 seleções classificadas, com grupo e confederação |
| `src/data/squads.ts` | Elencos oficiais dos 4 semifinalistas (26 jogadores cada) |
| `src/data/legends.ts` | As 20 Panini Extra Stickers (Legends) e as 4 variações de cor |
| `src/data/specials.ts` | Mascotes, taça dourada e os 16 estádios-sede |
| `src/data/schedule.ts` | Cronograma das semifinais, 3º lugar e final |
| `src/data/catalog.ts` | Catálogo derivado — todo item vendável, com preço vindo de `site.ts` |

Tipos de figurinha à venda: jogadores dos 4 semifinalistas (um a um), jogador
avulso das demais 44 seleções, escudos, Legends nas variações Roxa/Bronze/
Prata/Ouro, mascotes, taça e estádios.

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

**Antes de publicar**, se o seu domínio final não for `craquebox.vercel.app`,
faça um localizar-e-substituir de `https://craquebox.vercel.app` nestes 3 arquivos:

- [`index.html`](index.html) (canonical, og:url, og:image, JSON-LD)
- [`public/robots.txt`](public/robots.txt) (linha `Sitemap:`)
- [`public/sitemap.xml`](public/sitemap.xml) (`<loc>`)

Depois de no ar, envie o `sitemap.xml` ao Google Search Console.

## Segurança

Modelo de ameaça e mitigações em [`SECURITY.md`](SECURITY.md). Resumo: sem
backend, sem pagamento, sem coleta de dados; preços e número de redirecionamento
imutáveis em runtime; carrinho trata `localStorage` como entrada hostil.

## Avisos legais

- Site independente de colecionadores — não afiliado à FIFA nem à Panini.
- Fotos de jogadores e do estádio: Wikimedia Commons/Wikipedia, licenças
  CC BY / CC BY-SA (atribuição no rodapé do site). A arte oficial das
  figurinhas Panini não é reproduzida.
