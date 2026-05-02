/**
 * src/math/variance.test.ts
 * Verifies the √dₖ variance argument from Vaswani et al. §3.2.1.
 *
 * "We suspect that for large values of dₖ, the dot products grow large in
 *  magnitude, pushing the softmax function into regions where it has extremely
 *  small gradients. To counteract this, we scale the dot products by 1/√dₖ."
 */
import { describe, it, expect } from 'vitest'
import { randnMatrix } from './probability'
import { matmul, transpose } from './linalg'

const sampleVariance = (xs: number[]): number => {
  const mean = xs.reduce((a, b) => a + b, 0) / xs.length
  return xs.reduce((a, x) => a + (x - mean) ** 2, 0) / xs.length
}

describe('variance of Q·Kᵀ dot products', () => {
  const TRIALS = 500
  const N = 6

  it('unscaled variance ≈ dₖ for several dimensions', () => {
    for (const dk of [4, 16, 64, 256]) {
      const vars: number[] = []
      for (let t = 0; t < TRIALS; t++) {
        const Q = randnMatrix(N, dk)
        const K = randnMatrix(N, dk)
        const scores = matmul(Q, transpose(K))
        vars.push(sampleVariance(scores.flat()))
      }
      const meanVar = vars.reduce((a, b) => a + b, 0) / TRIALS
      // E[Var(q·k)] = dₖ  (sum of dₖ unit-variance products)
      expect(meanVar).toBeCloseTo(dk, -1) // within ±order-of-magnitude
    }
  })

  it('scaled variance ≈ 1 after dividing by √dₖ', () => {
    for (const dk of [4, 16, 64, 256]) {
      const vars: number[] = []
      for (let t = 0; t < TRIALS; t++) {
        const Q = randnMatrix(N, dk)
        const K = randnMatrix(N, dk)
        const scores = matmul(Q, transpose(K))
        const scaled = scores.flat().map(x => x / Math.sqrt(dk))
        vars.push(sampleVariance(scaled))
      }
      const meanVar = vars.reduce((a, b) => a + b, 0) / TRIALS
      // After scaling, variance should be ≈ 1
      expect(meanVar).toBeCloseTo(1, 0) // within ±1
    }
  })
})
