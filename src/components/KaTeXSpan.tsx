/**
 * src/components/KaTeXSpan.tsx
 * Inline KaTeX renderer. Wraps the katex.renderToString API.
 * Usage: <KaTeXSpan math="Q K^\top / \sqrt{d_k}" />
 */
import katex from 'katex'
import 'katex/dist/katex.min.css'

interface Props {
  math: string
  display?: boolean
  className?: string
}

export function KaTeXSpan({ math, display = false, className }: Props) {
  const html = katex.renderToString(math, {
    throwOnError: false,
    displayMode: display,
    trust: false,
  })
  return (
    <span
      className={className}
      // KaTeX output is static + sanitised — safe to set as innerHTML
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

export function KaTeXBlock({ math, className }: { math: string; className?: string }) {
  return <KaTeXSpan math={math} display className={className} />
}
