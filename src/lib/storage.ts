import { SITE } from '../config/site'

export interface StoredCartItem {
  id: string
  qty: number
}

/**
 * Carrega o carrinho do localStorage tratando o conteúdo como NÃO confiável:
 * qualquer entrada com id fora do catálogo é descartada, quantidades são
 * clampadas e o tamanho da lista é limitado. Preço nunca é lido daqui —
 * só id e quantidade.
 */
export function loadCart(validIds: ReadonlySet<string>): StoredCartItem[] {
  try {
    const raw = localStorage.getItem(SITE.cart.storageKey)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []

    const seen = new Set<string>()
    const items: StoredCartItem[] = []
    for (const entry of parsed) {
      if (items.length >= SITE.cart.maxDistinctItems) break
      if (typeof entry !== 'object' || entry === null) continue
      const { id, qty } = entry as Record<string, unknown>
      if (typeof id !== 'string' || !validIds.has(id) || seen.has(id)) continue
      const clamped =
        typeof qty === 'number' && Number.isFinite(qty)
          ? Math.min(Math.max(Math.trunc(qty), 1), SITE.cart.maxQtyPerItem)
          : 1
      seen.add(id)
      items.push({ id, qty: clamped })
    }
    return items
  } catch {
    return []
  }
}

export function saveCart(items: readonly StoredCartItem[]): void {
  try {
    localStorage.setItem(SITE.cart.storageKey, JSON.stringify(items))
  } catch {
    // modo privado/quota cheia — o carrinho continua funcionando em memória
  }
}
