import type { ReactNode } from 'react'

interface Props {
  kicker: string
  title: ReactNode
  sub?: string
  align?: 'left' | 'center'
}

export function SectionHeading({ kicker, title, sub, align = 'left' }: Props) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      <p className="kicker">{kicker}</p>
      <h2 className="mt-3 text-3xl font-black tracking-tight text-balance sm:text-4xl">{title}</h2>
      {sub && <p className="mt-3 text-base text-ink-soft text-pretty">{sub}</p>}
    </div>
  )
}
