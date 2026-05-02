/**
 * src/math/probability.test.ts
 * Unit tests for softmax, entropy, and sampling utilities.
 */
import { describe, it, expect } from 'vitest'
import { softmax, softmaxRows, entropy } from './probability'

describe('softmax', () => {
  it('output sums to 1', () => {
    const out = softmax([1, 2, 3, 4])
    expect(out.reduce((a, b) => a + b, 0)).toBeCloseTo(1)
  })

  it('largest input gets the largest weight', () => {
    const out = softmax([0.1, 5.0, 0.2])
    expect(out[1]).toBe(Math.max(...out))
  })

  it('uniform input gives uniform output', () => {
    const out = softmax([1, 1, 1, 1])
    out.forEach(v => expect(v).toBeCloseTo(0.25))
  })

  it('high temperature flattens the distribution', () => {
    const sharp = softmax([1, 2, 3], 0.1)
    const flat  = softmax([1, 2, 3], 10)
    expect(Math.max(...flat) - Math.min(...flat)).toBeLessThan(
      Math.max(...sharp) - Math.min(...sharp)
    )
  })

  it('low temperature sharpens toward argmax', () => {
    const out = softmax([1, 10, 1], 0.01)
    expect(out[1]).toBeGreaterThan(0.999)
  })

  it('is numerically stable with large inputs', () => {
    const out = softmax([1000, 1001, 1002])
    expect(out.reduce((a, b) => a + b, 0)).toBeCloseTo(1)
    out.forEach(v => expect(isFinite(v)).toBe(true))
  })
})

describe('softmaxRows', () => {
  it('each row sums to 1', () => {
    const A = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
    const out = softmaxRows(A)
    out.forEach(row => expect(row.reduce((a, b) => a + b, 0)).toBeCloseTo(1))
  })

  it('preserves row count', () => {
    const A = [[1, 2], [3, 4]]
    expect(softmaxRows(A)).toHaveLength(2)
  })
})

describe('entropy', () => {
  it('uniform distribution has maximum entropy for its size', () => {
    const n = 4
    const uniform = Array(n).fill(1 / n)
    expect(entropy(uniform)).toBeCloseTo(Math.log(n))
  })

  it('one-hot distribution has entropy 0', () => {
    expect(entropy([1, 0, 0, 0])).toBeCloseTo(0)
  })

  it('handles zero probabilities without NaN', () => {
    expect(isFinite(entropy([0.5, 0.5, 0, 0]))).toBe(true)
  })
})
