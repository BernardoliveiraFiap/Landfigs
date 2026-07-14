import { useState } from 'react'

interface Props {
  /** nome do arquivo em /public/players, sem extensão (ex.: 'fr-10') */
  slug: string
  alt?: string
  eager?: boolean
}

/**
 * Foto do jogador com fallback: se o arquivo não existir (ou falhar),
 * mostra uma silhueta neutra em vez de imagem quebrada.
 */
export function PlayerPhoto({ slug, alt = '', eager = false }: Props) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <svg
        viewBox="0 0 100 120"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMax meet"
      >
        <circle cx="50" cy="42" r="20" fill="rgb(255 255 255 / 0.28)" />
        <path
          d="M14 120c2-26 16-40 36-40s34 14 36 40z"
          fill="rgb(255 255 255 / 0.28)"
        />
      </svg>
    )
  }

  return (
    <img
      src={`/players/${slug}.jpg`}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      onError={() => setFailed(true)}
      className="absolute inset-0 h-full w-full object-cover object-top"
    />
  )
}
