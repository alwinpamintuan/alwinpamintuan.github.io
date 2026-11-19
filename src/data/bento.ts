const desktopRows = [[7, 5], [5, 7]];
const wideRows = [[7, 5], [4, 4, 4], [5, 7], [5, 4, 3]];

export function packBento(projectCount: number, allowTriples: boolean): number[] {
  if (projectCount === 0) return [6, 6];

  const spans = [4, 8];
  const rows = allowTriples ? wideRows : desktopRows;
  const cardCount = projectCount + 2;

  for (let row = 0; spans.length < cardCount; row++) {
    const remaining = cardCount - spans.length;
    if (remaining === 1) {
      spans.push(12);
      break;
    }

    const next = rows[row % rows.length];
    spans.push(...(remaining < next.length ? [6, 6] : next));
  }

  return spans;
}
