/**
 * src/components/Progress.ts
 * Per-chapter reading progress — tracks which chapters have been
 * visited and persists in localStorage. Reflected in sidebar ✓ marks.
 */

const KEY = 'attend-progress'

export type ChapterId = '§0' | '§1' | '§2' | '§3.2' | '§4.3' | '§4.4' | '§5' | '§6'

export const markVisited = (id: ChapterId) => {
  const visited = getVisited()
  visited.add(id)
  localStorage.setItem(KEY, JSON.stringify([...visited]))
}

export const getVisited = (): Set<ChapterId> => {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return new Set()
    return new Set(JSON.parse(raw) as ChapterId[])
  } catch {
    return new Set()
  }
}

export const getProgress = (): number => {
  const total = 8 // §0–§6
  return Math.round((getVisited().size / total) * 100)
}

export const clearProgress = () => {
  localStorage.removeItem(KEY)
}
