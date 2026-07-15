# Modelo de segurança — CraqueBox (Landfigs)

## Princípio central

**A superfície de ataque mais segura é a que não existe.** O site não tem
backend, não processa pagamento, não tem formulário que envie dados e não
armazena informação pessoal. Tudo que um atacante poderia "roubar ou alterar"
se resume a duas coisas — o **preço exibido** e o **número de destino do
WhatsApp** — e ambas são imutáveis por construção.

## Garantias e como são implementadas

### 1. Número do WhatsApp e preços não podem ser trocados

- Existem **somente** em [`src/config/site.ts`](src/config/site.ts), congelados
  em runtime com `deepFreeze` (Object.freeze recursivo) e imutáveis em
  compile-time (`as const`). Tentativa de reatribuir falha silenciosamente ou
  lança em strict mode.
- `buildWhatsAppLink()` ([`src/lib/whatsapp.ts`](src/lib/whatsapp.ts))
  **não aceita número por parâmetro** — não existe caminho de código em que o
  destino do redirect seja variável.
- O link/mensagem é construído **no momento do clique** a partir do config
  congelado — nunca lido do DOM, de atributo, de query string ou de storage.
  Alterar o HTML pelo DevTools muda só a tela do próprio atacante, nunca a
  mensagem gerada.
- O bundle de produção tem hash no nome (`assets/index-*.js`) e é servido com
  `Cache-Control: immutable`; o CSP impede carregar script de qualquer outra
  origem, então não há como injetar um bundle adulterado sem controlar o
  próprio deploy.

### 2. Carrinho: `localStorage` é entrada hostil

[`src/lib/storage.ts`](src/lib/storage.ts) valida tudo ao carregar:

- só entram ids que existem no catálogo congelado (`CATALOG_IDS`);
- quantidades são truncadas e clampadas (1–50), duplicatas removidas,
  tamanho da lista limitado;
- **preço nunca é lido do storage** — só id + quantidade; o total é sempre
  recalculado do catálogo (também no momento do checkout, em
  [`src/lib/checkout.ts`](src/lib/checkout.ts));
- JSON inválido/corrompido → carrinho vazio, sem crash.

### 3. Anti-abuso de botões (o "DoS de clique")

- `openWhatsApp()` tem **throttle global** (1 abertura a cada 2,5 s) — spam de
  clique, clique duplo ou macro não dispara dezenas de janelas.
- O botão de checkout também trava (`disabled`) enquanto o throttle vale —
  defesa em profundidade (UI + lib).
- DoS de rede real não se mitiga no app: o site é estático na borda da Vercel
  (CDN). Para ataques volumétricos, ativar o **Firewall/Challenge Mode no
  dashboard da Vercel** — não há servidor nosso para derrubar.

### 4. Headers (vercel.json)

- **CSP enforced**: `default-src 'self'`; scripts só da própria origem
  (`script-src 'self'`, sem inline); imagens/fontes locais; `form-action 'none'`
  (não existe formulário que poste); `frame-ancestors 'none'` (anti
  clickjacking); `base-uri 'self'` (anti base-tag hijack).
- `Strict-Transport-Security` com preload, `X-Content-Type-Options: nosniff`,
  `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`
  negando câmera/microfone/geolocalização/pagamento, `COOP: same-origin`.
- Isso é possível porque **nada externo é carregado em runtime**: fonte
  self-hosted, bandeiras locais, zero analytics/CDN de terceiros.

### 5. Links externos e XSS

- Todo link `wa.me` usa `target="_blank"` + `rel="noopener noreferrer"`, e o
  `window.open` passa `noopener` (anti tab-nabbing reverso).
- Nenhum `dangerouslySetInnerHTML`; todo texto passa pelo escaping padrão do
  React. A única entrada de usuário (busca de seleção) filtra uma lista local,
  tem `maxLength` e nunca vira HTML.
- Mensagem do WhatsApp é `encodeURIComponent` + limite de tamanho.

## O que este modelo NÃO cobre (por design)

- **Compromisso da conta Vercel/GitHub** — quem controla o deploy controla o
  site. Use 2FA nas duas contas.
- **Golpe fora do site** — a conversa acontece no WhatsApp; confirme sempre o
  número oficial (fixado no rodapé e em todos os botões).
- O cliente pode editar a mensagem *no próprio WhatsApp* antes de enviar —
  por isso o preço é tabelado e a mensagem é conferida pelo vendedor; o site
  envia o total apenas como conveniência, não como fonte de verdade da venda.
