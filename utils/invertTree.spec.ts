import { describe, expect, test } from "vitest";
import { invertTree } from "./invertTree";

describe('invertTree', () => {
  test('Case: should invert the tree of 7 nodes', () => {
    const tree = [5, 3, 8, 1, 7, 2, 6]
    const expected = [5, 8, 3, 6, 2, 7, 1]

    expect(invertTree(tree)).toEqual(expected)
  })

  test('Case: should invert the tree of 3 nodes', () => {
    const tree = [6, 8, 9]
    const expected = [6, 9, 8]

    expect(invertTree(tree)).toEqual(expected)
  })

  test('Case: should add null to result if origin has not enough length', () => {
    const tree = [5, 3, 8, 1, 7, 2, 6, 100, 3, -1]
    const expected = [5, 8, 3, 6, 2, 7, 1, null, null, null, null, null, -1, 3, 100]

    expect(invertTree(tree)).toEqual(expected)
  })

  test('Case: should return empty array if origin is empty', () => {
    const tree: number[] = []
    const expected: number[] = []

    expect(invertTree(tree)).toEqual(expected)
  })
})