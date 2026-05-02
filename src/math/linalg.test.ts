/**
 * src/math/linalg.test.ts
 * Unit tests for linear-algebra primitives.
 */
import { describe, it, expect } from 'vitest'
import { zeros, zerosVec, matmul, transpose, scaleMatrix, addMatrix, dot, norm, cosineSim, fmt, heatVar } from './linalg'

describe('zeros', () => {
  it('creates a 3×2 zero matrix', () => {
    const Z = zeros(3, 2)
    expect(Z).toHaveLength(3)
    Z.forEach(row => { expect(row).toHaveLength(2); row.forEach(v => expect(v).toBe(0)) })
  })
})

describe('zerosVec', () => {
  it('creates a 4-element zero vector', () => {
    expect(zerosVec(4)).toEqual([0, 0, 0, 0])
  })
})

describe('matmul', () => {
  it('multiplies a 2×3 by a 3×2 to give 2×2', () => {
    const A = [[1, 2, 3], [4, 5, 6]]
    const B = [[7, 8], [9, 10], [11, 12]]
    const C = matmul(A, B)
    expect(C).toEqual([[58, 64], [139, 154]])
  })

  it('multiplies identity matrix correctly', () => {
    const I = [[1, 0], [0, 1]]
    const A = [[3, 7], [2, 5]]
    expect(matmul(I, A)).toEqual(A)
    expect(matmul(A, I)).toEqual(A)
  })

  it('throws on shape mismatch', () => {
    expect(() => matmul([[1, 2]], [[3], [4], [5]])).toThrow()
  })
})

describe('transpose', () => {
  it('transposes a 2×3 to 3×2', () => {
    const A = [[1, 2, 3], [4, 5, 6]]
    expect(transpose(A)).toEqual([[1, 4], [2, 5], [3, 6]])
  })

  it('double-transpose is identity', () => {
    const A = [[1, 2], [3, 4], [5, 6]]
    expect(transpose(transpose(A))).toEqual(A)
  })
})

describe('scaleMatrix', () => {
  it('multiplies every element by the scalar', () => {
    const A = [[1, 2], [3, 4]]
    expect(scaleMatrix(A, 2)).toEqual([[2, 4], [6, 8]])
  })
  it('scaling by 0 gives all zeros', () => {
    const A = [[1, 2], [3, 4]]
    expect(scaleMatrix(A, 0)).toEqual([[0, 0], [0, 0]])
  })
})

describe('addMatrix', () => {
  it('adds element-wise', () => {
    const A = [[1, 2], [3, 4]]
    const B = [[5, 6], [7, 8]]
    expect(addMatrix(A, B)).toEqual([[6, 8], [10, 12]])
  })
  it('throws on shape mismatch', () => {
    expect(() => addMatrix([[1, 2]], [[1, 2], [3, 4]])).toThrow()
  })
})

describe('dot', () => {
  it('computes the dot product of two vectors', () => {
    expect(dot([1, 2, 3], [4, 5, 6])).toBe(32)
  })
  it('orthogonal vectors give 0', () => {
    expect(dot([1, 0], [0, 1])).toBe(0)
  })
  it('throws on length mismatch', () => {
    expect(() => dot([1, 2], [1, 2, 3])).toThrow()
  })
})

describe('norm', () => {
  it('computes Euclidean norm', () => {
    expect(norm([3, 4])).toBeCloseTo(5)
  })
  it('unit vector has norm 1', () => {
    expect(norm([1, 0, 0])).toBeCloseTo(1)
  })
})

describe('cosineSim', () => {
  it('identical vectors have similarity 1', () => {
    expect(cosineSim([1, 2, 3], [1, 2, 3])).toBeCloseTo(1)
  })
  it('opposite vectors have similarity -1', () => {
    expect(cosineSim([1, 0], [-1, 0])).toBeCloseTo(-1)
  })
  it('orthogonal vectors have similarity 0', () => {
    expect(cosineSim([1, 0], [0, 1])).toBeCloseTo(0)
  })
})

describe('fmt', () => {
  it('formats to 2 decimal places by default', () => {
    expect(fmt(3.14159)).toBe('3.14')
  })
  it('strips negative zero', () => {
    expect(fmt(-0.001)).toBe('0.00')
  })
  it('respects custom decimal places', () => {
    expect(fmt(1.23456, 4)).toBe('1.2346')
  })
})

describe('heatVar', () => {
  it('maps 0 to heat-0', () => {
    expect(heatVar(0)).toBe('var(--heat-0)')
  })
  it('maps 1 to heat-5', () => {
    expect(heatVar(1)).toBe('var(--heat-5)')
  })
  it('maps 0.5 to heat-3', () => {
    expect(heatVar(0.5)).toBe('var(--heat-3)')
  })
  it('clamps values below 0', () => {
    expect(heatVar(-1)).toBe('var(--heat-0)')
  })
  it('clamps values above 1', () => {
    expect(heatVar(2)).toBe('var(--heat-5)')
  })
})
