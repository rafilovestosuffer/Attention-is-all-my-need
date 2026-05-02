/**
 * src/math/positional.test.ts
 * Unit tests for sinusoidal positional encodings.
 * Reference: Vaswani et al. (2017) §3.5, Eq. (2)–(3).
 */
import { describe, it, expect } from 'vitest'
import { peEntry, positionalEncoding } from './positional'

describe('peEntry', () => {
  it('PE(0, 0, 512) = sin(0) = 0', () => {
    expect(peEntry(0, 0, 512)).toBeCloseTo(0)
  })

  it('PE(0, 1, 512) = cos(0) = 1', () => {
    expect(peEntry(0, 1, 512)).toBeCloseTo(1)
  })

  it('even dims use sine', () => {
    // PE(1, 0, 4) = sin(1 / 10000^0) = sin(1)
    expect(peEntry(1, 0, 4)).toBeCloseTo(Math.sin(1))
  })

  it('odd dims use cosine', () => {
    // PE(1, 1, 4) = cos(1 / 10000^0) = cos(1)
    expect(peEntry(1, 1, 4)).toBeCloseTo(Math.cos(1))
  })

  it('values are always in [-1, 1]', () => {
    for (let pos = 0; pos < 100; pos++)
      for (let dim = 0; dim < 64; dim++) {
        const v = peEntry(pos, dim, 64)
        expect(v).toBeGreaterThanOrEqual(-1)
        expect(v).toBeLessThanOrEqual(1)
      }
  })

  it('high-frequency dims (low index) oscillate fast', () => {
    // dimension 0 should complete more cycles than dimension 62
    const vals0  = Array.from({ length: 50 }, (_, p) => peEntry(p, 0, 64))
    const vals62 = Array.from({ length: 50 }, (_, p) => peEntry(p, 62, 64))
    const crossings = (xs: number[]) =>
      xs.slice(1).filter((v, i) => v * xs[i] < 0).length
    expect(crossings(vals0)).toBeGreaterThan(crossings(vals62))
  })
})

describe('positionalEncoding', () => {
  it('produces shape [seqLen, dModel]', () => {
    const PE = positionalEncoding(10, 16)
    expect(PE).toHaveLength(10)
    PE.forEach(row => expect(row).toHaveLength(16))
  })

  it('position 0 always has alternating 0s and 1s in any even d_model', () => {
    const PE = positionalEncoding(5, 8)
    // Even dims: sin(0) = 0; odd dims: cos(0) = 1
    for (let i = 0; i < 8; i++)
      expect(PE[0][i]).toBeCloseTo(i % 2 === 0 ? 0 : 1)
  })

  it('all values are in [-1, 1]', () => {
    const PE = positionalEncoding(64, 64)
    PE.flat().forEach(v => {
      expect(v).toBeGreaterThanOrEqual(-1 - 1e-9)
      expect(v).toBeLessThanOrEqual(1 + 1e-9)
    })
  })

  it('every position has a unique encoding', () => {
    const PE = positionalEncoding(20, 32)
    for (let i = 0; i < PE.length; i++)
      for (let j = i + 1; j < PE.length; j++) {
        const same = PE[i].every((v, k) => Math.abs(v - PE[j][k]) < 1e-9)
        expect(same).toBe(false)
      }
  })
})
