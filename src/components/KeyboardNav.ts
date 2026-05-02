/**
 * src/components/KeyboardNav.ts
 * Global keyboard shortcuts for Attend reader.
 * j / ArrowRight → next chapter
 * k / ArrowLeft  → prev chapter
 * / → focus search
 * ? → toggle cheatsheet
 * Escape → close any open panel
 */

const CHAPTERS = [
  '/ui_kits/reader/ch0-prerequisites.html',
  '/ui_kits/reader/ch1-dot-product.html',
  '/ui_kits/reader/ch2-softmax.html',
  '/ui_kits/reader/ch3-scale.html',
  '/ui_kits/reader/index.html',
  '/ui_kits/reader/ch4-multihead.html',
  '/ui_kits/reader/ch5-positional.html',
  '/ui_kits/reader/ch6-transformer.html',
]

const getCurrentIndex = () => {
  const path = window.location.pathname
  return CHAPTERS.findIndex(c => path.endsWith(c.replace(/^\//, '')))
}

export const initKeyboardNav = () => {
  let cheatsheetOpen = false

  const cheatsheet = document.createElement('div')
  cheatsheet.id = 'kbd-cheatsheet'
  cheatsheet.setAttribute('role', 'dialog')
  cheatsheet.setAttribute('aria-label', 'Keyboard shortcuts')
  cheatsheet.style.cssText = `
    display:none;position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);
    z-index:9999;background:var(--paper);border:1px solid var(--paper-edge);
    border-radius:14px;padding:28px 32px;box-shadow:var(--shadow-3);
    min-width:320px;font-family:var(--font-sans);font-size:14px;
  `
  cheatsheet.innerHTML = `
    <div style="font-family:var(--font-display);font-style:italic;font-weight:600;font-size:20px;color:var(--ink);margin-bottom:16px">Keyboard shortcuts</div>
    <table style="border-collapse:collapse;width:100%">
      ${[
        ['j / →', 'Next chapter'],
        ['k / ←', 'Previous chapter'],
        ['/', 'Focus search'],
        ['?', 'Toggle this panel'],
        ['Escape', 'Close panels'],
      ].map(([key, desc]) => `
        <tr>
          <td style="padding:6px 16px 6px 0">
            <kbd style="background:var(--paper-2);border:1px solid var(--paper-edge);border-radius:4px;padding:2px 8px;font-family:var(--font-mono);font-size:12px">${key}</kbd>
          </td>
          <td style="color:var(--ink-2)">${desc}</td>
        </tr>
      `).join('')}
    </table>
    <div style="margin-top:16px;color:var(--ink-4);font-size:12px">Press Escape or ? to close</div>
  `
  document.body.appendChild(cheatsheet)

  document.addEventListener('keydown', (e) => {
    const tag = (e.target as HTMLElement).tagName
    const inInput = tag === 'INPUT' || tag === 'TEXTAREA'

    if (e.key === 'Escape') {
      cheatsheet.style.display = 'none'
      cheatsheetOpen = false
      return
    }

    if (e.key === '?') {
      cheatsheetOpen = !cheatsheetOpen
      cheatsheet.style.display = cheatsheetOpen ? 'block' : 'none'
      return
    }

    if (inInput) return

    if (e.key === 'j' || e.key === 'ArrowRight') {
      const idx = getCurrentIndex()
      if (idx >= 0 && idx < CHAPTERS.length - 1)
        window.location.href = CHAPTERS[idx + 1]
    }

    if (e.key === 'k' || e.key === 'ArrowLeft') {
      const idx = getCurrentIndex()
      if (idx > 0)
        window.location.href = CHAPTERS[idx - 1]
    }

    if (e.key === '/') {
      e.preventDefault()
      const search = document.getElementById('search-input') as HTMLInputElement | null
      search?.focus()
    }
  })
}
