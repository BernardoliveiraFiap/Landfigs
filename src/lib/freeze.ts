/**
 * Congela um objeto recursivamente em runtime.
 * Junto com `as const` (imutabilidade em tempo de compilação), garante que
 * nenhum script consiga reatribuir preços ou o número do WhatsApp depois do load.
 */
export function deepFreeze<T>(value: T): T {
  if (value !== null && typeof value === 'object' && !Object.isFrozen(value)) {
    for (const key of Object.getOwnPropertyNames(value)) {
      deepFreeze((value as Record<string, unknown>)[key])
    }
    Object.freeze(value)
  }
  return value
}
