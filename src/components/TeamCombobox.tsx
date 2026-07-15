import { useEffect, useMemo, useRef, useState } from 'react'
import { TEAMS } from '../data/teams'
import { normalizeText } from '../lib/slug'
import { IconChevronRight, IconX } from './icons'

interface Props {
  /** iso da seleção selecionada, ou '' para todas */
  value: string
  onChange: (iso: string) => void
}

/**
 * Campo de seleção com busca por digitação — pensado para o toque:
 * opções altas (44px+), lista rolável e botão de limpar sempre visível.
 */
export function TeamCombobox({ value, onChange }: Props) {
  const [open, setOpen] = useState(false)
  const [text, setText] = useState('')
  const [activeIdx, setActiveIdx] = useState(0)
  const rootRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([])

  const selected = TEAMS.find((t) => t.iso === value) ?? null

  const options = useMemo(() => {
    const q = normalizeText(text.trim())
    return q === '' ? TEAMS : TEAMS.filter((t) => normalizeText(t.namePt).includes(q))
  }, [text])

  useEffect(() => {
    if (!open) return
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [open])

  useEffect(() => {
    setActiveIdx(0)
  }, [text, open])

  // mantém a opção destacada pelo teclado sempre visível na lista rolável
  useEffect(() => {
    if (open) optionRefs.current[activeIdx]?.scrollIntoView({ block: 'nearest' })
  }, [activeIdx, open])

  function select(iso: string) {
    onChange(iso)
    setText('')
    setOpen(false)
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (!open && (e.key === 'ArrowDown' || e.key === 'Enter')) {
      setOpen(true)
      return
    }
    if (e.key === 'Escape') {
      setOpen(false)
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIdx((i) => Math.min(i + 1, options.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIdx((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const opt = options[activeIdx]
      if (opt) select(opt.iso)
    }
  }

  return (
    <div ref={rootRef} className="relative lg:w-64">
      <div className="relative">
        {selected && !open && (
          <img
            src={`/flags/${selected.iso}.webp`}
            alt=""
            width={24}
            className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 rounded-[3px] ring-1 ring-ink/10"
          />
        )}
        <input
          ref={inputRef}
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-label="Filtrar por seleção"
          value={open ? text : (selected?.namePt ?? '')}
          placeholder="Todas as seleções"
          maxLength={30}
          onFocus={() => {
            setOpen(true)
            setText('')
          }}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={onKeyDown}
          className={`w-full rounded-xl border-2 border-line bg-paper py-3.5 pr-11 text-sm font-semibold placeholder:font-medium focus:border-grass-400 ${
            selected && !open ? 'pl-12' : 'pl-4'
          }`}
        />
        {selected && !open ? (
          <button
            type="button"
            onClick={() => {
              onChange('')
              setText('')
              inputRef.current?.focus()
            }}
            aria-label={`Limpar seleção: ${selected.namePt}`}
            className="btn absolute top-1/2 right-2 size-9 -translate-y-1/2 text-ink-soft hover:bg-mist hover:text-ink"
          >
            <IconX className="size-4" />
          </button>
        ) : (
          <IconChevronRight
            className={`pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-ink-soft transition-transform ${
              open ? '-rotate-90' : 'rotate-90'
            }`}
          />
        )}
      </div>

      {open && (
        <div className="card absolute z-30 mt-2 max-h-72 w-full overflow-y-auto py-1 shadow-pop">
          <button
            type="button"
            onClick={() => select('')}
            className={`flex w-full items-center gap-2.5 px-4 py-3 text-left text-sm font-semibold hover:bg-mist ${
              value === '' ? 'text-grass-700' : ''
            }`}
          >
            <span className="h-4 w-6 rounded-[3px] bg-line" />
            Todas as seleções
          </button>
          {options.map((t, i) => (
            <button
              key={t.iso}
              ref={(el) => {
                optionRefs.current[i] = el
              }}
              type="button"
              onClick={() => select(t.iso)}
              className={`flex w-full items-center gap-2.5 px-4 py-3 text-left text-sm font-semibold hover:bg-mist ${
                i === activeIdx ? 'bg-grass-50' : ''
              } ${t.iso === value ? 'text-grass-700' : ''}`}
            >
              <img
                src={`/flags/${t.iso}.webp`}
                alt=""
                width={24}
                loading="lazy"
                className="rounded-[3px] ring-1 ring-ink/10"
              />
              {t.namePt}
            </button>
          ))}
          {options.length === 0 && (
            <p className="px-4 py-3 text-sm font-medium text-ink-soft">
              Nenhuma seleção com esse nome.
            </p>
          )}
        </div>
      )}
    </div>
  )
}
