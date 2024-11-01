type inputTree = number[]
type outputTree = (number | null)[]

export function invertTree (originTree: inputTree): outputTree {
  const result: outputTree = [];
  const treeLength = originTree.length;
  let endIndex = 0;

  for (let depth = 1; treeLength > endIndex; depth = depth << 1) {
    const startIndex = endIndex
    endIndex += depth
    for (let i = endIndex - 1; i >= startIndex; i--) {
      result.push(originTree[i] ?? null)
    }
  }

  return result;
}