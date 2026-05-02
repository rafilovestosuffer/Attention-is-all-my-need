/**
 * src/math/attention.test.ts
 * Unit tests for scaled dot-product attention and multi-head attention.
 * Reference values verified against the toy Q/K/V matrices.
 */
import { describe, it, expect } from 'vitest'
import { scaledDotProductAttention, multiHeadAttention, TOY_Q, TOY_K, TOY_V } from './attention'

// ─── Helpers ─────────────────────────────────────────────────────────────────
const rowSums = (M: number[][]) => M.map(row => row.reduce((a, b) => a + b, 0))
const allClose = (a: number, b: number, tol = 1e-6) => Math.abs(a - b) < tol

// ─── scaledDotProductAttention ────────────────────────────────────────────────

describe('scaledDotProductAttention', () => {
  const result = scaledDotProductAttention(TOY_Q, TOY_K, TOY_V)

  it('returns correct shape: weights [n, n]', () => {
    expect(result.weights).toHaveLength(6)
    result.weights.forEach(row => expect(row).toHaveLength(6))
  })

  it('returns correct shape: output [n, dk]', () => {
    expect(result.output).toHaveLength(6)
    result.output.forEach(row => expect(row).toHaveLength(4))
  })

  it('attention weight rows sum to 1 (Vaswani §3.2.1)', () => {
    rowSums(result.weights).forEach(s => expect(s).toBeCloseTo(1))
  })

  it('all attention weights are in [0, 1]', () => {
    result.weights.flat().forEach(w => {
      expect(w).toBeGreaterThanOrEqual(0)
      expect(w).toBeLessThanOrEqual(1)
    })
  })

  it('dk is 4 for the toy matrices', () => {
    expect(result.dk).toBe(4)
  })

  it('scaled scores have lower std than raw scores', () => {
    const rawStd = (xs: number[]) => {
      const m = xs.reduce((a, b) => a + b) / xs.length
      return Math.sqrt(xs.reduce((a, x) => a + (x - m) ** 2, 0) / xs.length)
    }
    expect(rawStd(result.scaledScores.flat())).toBeLessThan(
      rawStd(result.scores.flat())
    )
  })

  it('unscaled mode: scores equal scaledScores', () => {
    const unscaled = scaledDotProductAttention(TOY_Q, TOY_K, TOY_V, { scaled: false })
    unscaled.scores.flat().forEach((v, i) => {
      expect(allClose(v, unscaled.scaledScores.flat()[i])).toBe(true)
    })
  })

  it('high temperature → flatter weights (entropy increases)', () => {
    const { entropy } = await import('./probability').then(m => m)
    const sharp = scaledDotProductAttention(TOY_Q, TOY_K, TOY_V, { temperature: 0.1 })
    const flat  = scaledDotProductAttention(TOY_Q, TOY_K, TOY_V, { temperature: 10 })
    // Average entropy over rows
    const avgEntropy = (W: number[][]) =>
      W.reduce((s, row) => s + entropy(row), 0) / W.length
    expect(avgEntropy(flat.weights)).toBeGreaterThan(avgEntropy(sharp.weights))
  })

  it('identical Q and K → symmetric weight matrix', () => {
    const sym = scaledDotProductAttention(TOY_Q, TOY_Q, TOY_V)
    for (let i = 0; i < 6; i++)
      for (let j = 0; j < 6; j++)
        expect(sym.weights[i][j]).toBeCloseTo(sym.weights[j][i], 5)
  })
})

// ─── multiHeadAttention ───────────────────────────────────────────────────────

describe('multiHeadAttention', () => {
  // d_model = 4, h = 2 → dk = 2 per head
  const mh = multiHeadAttention(TOY_Q, TOY_K, TOY_V, 2)

  it('returns h = 2 heads', () => {
    expect(mh.heads).toHaveLength(2)
  })

  it('concat shape is [n, d_model]', () => {
    expect(mh.concat).toHaveLength(6)
    mh.concat.forEach(row => expect(row).toHaveLength(4))
  })

  it('each head output has dk = 2', () => {
    mh.heads.forEach(h => expect(h.dk).toBe(2))
  })

  it('each head weight rows sum to 1', () => {
    mh.heads.forEach(h =>
      rowSums(h.weights).forEach(s => expect(s).toBeCloseTo(1))
    )
  })

  it('throws when h does not divide d_model', () => {
    expect(() => multiHeadAttention(TOY_Q, TOY_K, TOY_V, 3)).toThrow()
  })
})
