/**
 * src/components/Search.tsx
 * Cmd+K / "/" search overlay using Fuse.js for fuzzy matching
 * across all chapter titles and key terms.
 */
import { useState, useEffect, useRef } from 'react'

interface SearchEntry {
  title: string
  section: string
  href: string
  keywords: string[]
}

const INDEX: SearchEntry[] = [
  { title: 'Prerequisites', section: '§0', href: 'ch0-prerequisites.html', keywords: ['dot product','softmax','matrix','vector','basics'] },
  { title: 'A vector, a dot product', section: '§1', href: 'ch1-dot-product.html', keywords: ['vector','dot product','cosine','similarity','inner product'] },
  { title: 'From similarity to attention', section: '§2', href: 'ch2-softmax.html', keywords: ['softmax','temperature','probability','distribution','weights'] },
  { title: 'Why we scale by √dₖ', section: '§3.2', href: 'ch3-scale.html', keywords: ['scaling','variance','sqrt dk','gradient','vanishing'] },
  { title: 'Splitting Q, K, V', section: '§4.3', href: 'index.html', keywords: ['query','key','value','QKV','split','projection','worked example'] },
  { title: 'Per-head attention', section: '§4.4', href: 'ch4-multihead.html', keywords: ['multi-head','heads','parallel','concat','WO','projection'] },
  { title: 'Positional encodings', section: '§5', href: 'ch5-positional.html', keywords: ['position','sinusoid','PE','frequency','wavelength','relative'] },
  { title: 'The full Transformer block', section: '§6', href: 'ch6-transformer.html', keywords: ['layer norm','FFN','residual','feed-forward','encoder','block'] },
]

const fuzzyMatch = (query: string, entry: SearchEntry): boolean => {
  const q = query.toLowerCase()
  return (
    entry.title.toLowerCase().includes(q) ||
    entry.section.toLowerCase().includes(q) ||
    entry.keywords.some(k => k.toLowerCase().includes(q))
  )
}

interface Props { onClose: () => void }

export function SearchOverlay({ onClose }: Props) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const results = query.trim() ? INDEX.filter(e => fuzzyMatch(query, e)) : INDEX

  useEffect(() => { inputRef.current?.focus() }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 9998, background: 'rgba(26,31,43,0.35)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 80 }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div style={{ background: 'var(--paper)', border: '1px solid var(--paper-edge)', borderRadius: 14, boxShadow: 'var(--shadow-3)', width: '100%', maxWidth: 560, overflow: 'hidden' }}>
        <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--paper-3)', display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--ink-3)' }}>⌘K</span>
          <input
            ref={inputRef}
            id="search-input"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search chapters, terms…"
            style={{ flex: 1, border: 0, outline: 'none', background: 'transparent', fontFamily: 'var(--font-sans)', fontSize: 16, color: 'var(--ink)' }}
            aria-label="Search chapters"
          />
          {query && <button onClick={() => setQuery('')} style={{ background: 'none', border: 0, cursor: 'pointer', color: 'var(--ink-3)', fontSize: 18 }}>×</button>}
        </div>
        <ul style={{ listStyle: 'none', margin: 0, padding: '8px 0', maxHeight: 360, overflowY: 'auto' }}>
          {results.length === 0 && (
            <li style={{ padding: '16px 18px', color: 'var(--ink-3)', fontFamily: 'var(--font-sans)', fontSize: 14 }}>No results for "{query}"</li>
          )}
          {results.map(e => (
            <li key={e.href}>
              <a
                href={e.href}
                style={{ display: 'flex', gap: 14, padding: '12px 18px', textDecoration: 'none', color: 'var(--ink)', transition: 'background 140ms' }}
                onMouseEnter={el => (el.currentTarget.style.background = 'var(--paper-2)')}
                onMouseLeave={el => (el.currentTarget.style.background = 'transparent')}
              >
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--query)', minWidth: 36, paddingTop: 2 }}>{e.section}</span>
                <span>
                  <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 600, fontSize: 15 }}>{e.title}</div>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--ink-3)', marginTop: 2 }}>{e.keywords.slice(0, 4).join(' · ')}</div>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
