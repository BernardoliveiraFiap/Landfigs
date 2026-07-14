/** minúsculas + remoção de acentos, para busca e comparação. */
export function normalizeText(value: string): string {
  return value.toLowerCase().normalize('NFD').replace(/\p{M}/gu, '')
}

/** identificador estável a partir de um nome (ex.: "Neymar Jr" -> "neymar-jr"). */
export function slugify(value: string): string {
  return normalizeText(value)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
