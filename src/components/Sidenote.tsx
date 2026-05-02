/**
 * src/components/Sidenote.tsx
 * Citation sidenote — shows a superscript number inline; on hover/click,
 * opens a floating panel with the reference text.
 */
import { useState, useRef, useEffect } from 'react'

interface Props {
  n: number           // footnote number
  children: React.ReactNode  // sidenote content
}

export function Sidenote({ n, children }: Props) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  return (
    <span ref={ref} style={{ position: 'relative', display: 'inline' }}>
      <sup
        onClick={() => setOpen(v => !v)}
        style={{
          cursor: 'pointer',
          color: 'var(--query)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7em',
          fontWeight: 700,
          marginLeft: '1px',
          userSelect: 'none',
        }}
        aria-label={`Open citation ${n}`}
      >
        [{n}]
      </sup>
      {open && (
        <span
          role="note"
          style={{
            position: 'absolute',
            bottom: '1.8em',
            left: 0,
            zIndex: 100,
            width: 280,
            background: 'var(--paper)',
            border: '1px solid var(--paper-edge)',
            borderRadius: 8,
            padding: '12px 14px',
            boxShadow: 'var(--shadow-3)',
            fontSize: 13,
            lineHeight: 1.55,
            color: 'var(--ink-2)',
            fontFamily: 'var(--font-sans)',
          }}
        >
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--query)', display: 'block', marginBottom: 4 }}>
            [{n}]
          </span>
          {children}
        </span>
      )}
    </span>
  )
}
