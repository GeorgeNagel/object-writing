const SCORES_DATA = [
  { date: 'Apr 9',  score: 0.10, sub: { words: 3,  senses: 1, sight: 2, hearing: 1, touch: 0, kinaesthetic: 0, organic: 0, smell: 0 } },
  { date: 'Apr 10', score: 0.15, sub: { words: 5,  senses: 3, sight: 4, hearing: 2, touch: 2, kinaesthetic: 1, organic: 0, smell: 0 } },
  { date: 'Apr 11', score: 0.12, sub: { words: 3,  senses: 1, sight: 2, hearing: 1, touch: 0, kinaesthetic: 0, organic: 0, smell: 0 } },
  { date: 'Apr 12', score: 0.31, sub: { words: 6,  senses: 4, sight: 5, hearing: 3, touch: 2, kinaesthetic: 2, organic: 1, smell: 0 } },
  { date: 'Apr 13', score: 0.12, sub: { words: 4,  senses: 2, sight: 3, hearing: 1, touch: 1, kinaesthetic: 1, organic: 0, smell: 0 } },
  { date: 'Apr 14', score: 0.05, sub: { words: 7,  senses: 4, sight: 5, hearing: 3, touch: 3, kinaesthetic: 2, organic: 2, smell: 1 } },
  { date: 'Apr 15', score: 0.21, sub: { words: 5,  senses: 2, sight: 3, hearing: 2, touch: 2, kinaesthetic: 1, organic: 0, smell: 0 } },
  { date: 'Apr 16', score: 0.24, sub: { words: 8,  senses: 5, sight: 6, hearing: 4, touch: 3, kinaesthetic: 3, organic: 2, smell: 1 } },
  { date: 'Apr 17', score: 0.41, sub: { words: 5,  senses: 3, sight: 4, hearing: 2, touch: 2, kinaesthetic: 2, organic: 1, smell: 0 } },
  { date: 'Apr 18', score: 0.54, sub: { words: 7,  senses: 4, sight: 5, hearing: 3, touch: 3, kinaesthetic: 3, organic: 2, smell: 1 } },
  { date: 'Apr 19', score: 0.31, sub: { words: 5,  senses: 3, sight: 4, hearing: 2, touch: 2, kinaesthetic: 1, organic: 1, smell: 0 } },
  { date: 'Apr 20', score: 0.35, sub: { words: 8,  senses: 5, sight: 6, hearing: 5, touch: 4, kinaesthetic: 3, organic: 3, smell: 2 } },
  { date: 'Apr 21', score: 0.39, sub: { words: 6,  senses: 3, sight: 4, hearing: 3, touch: 3, kinaesthetic: 2, organic: 1, smell: 1 } },
  { date: 'Apr 22', score: 0.52, sub: { words: 9,  senses: 6, sight: 7, hearing: 5, touch: 5, kinaesthetic: 4, organic: 3, smell: 2 } },
  { date: 'Apr 23', score: 0.45, sub: { words: 6,  senses: 4, sight: 5, hearing: 3, touch: 3, kinaesthetic: 3, organic: 2, smell: 1 } },
  { date: 'Apr 24', score: 0.58, sub: { words: 9,  senses: 7, sight: 8, hearing: 6, touch: 5, kinaesthetic: 5, organic: 4, smell: 3 } },
  { date: 'Apr 25', score: 0.55, sub: { words: 7,  senses: 4, sight: 5, hearing: 4, touch: 4, kinaesthetic: 3, organic: 2, smell: 2 } },
  { date: 'Apr 26', score: 0.61, sub: { words: 10, senses: 7, sight: 8, hearing: 6, touch: 6, kinaesthetic: 5, organic: 4, smell: 3 } },
  { date: 'Apr 27', score: 0.68, sub: { words: 7,  senses: 5, sight: 6, hearing: 4, touch: 4, kinaesthetic: 4, organic: 3, smell: 2 } },
  { date: 'Apr 28', score: 0.64, sub: { words: 9,  senses: 6, sight: 7, hearing: 6, touch: 5, kinaesthetic: 5, organic: 4, smell: 3 } },
];

const SUB_LABELS = [
  { key: 'words',        label: 'Number of Words' },
  { key: 'senses',       label: 'Number of Senses' },
  { key: 'sight',        label: 'Sight Count' },
  { key: 'hearing',      label: 'Hearing Count' },
  { key: 'touch',        label: 'Touch Count' },
  { key: 'kinaesthetic', label: 'Kinaesthetic Count' },
  { key: 'organic',      label: 'Organic Count' },
  { key: 'smell',        label: 'Smell Count' },
];

function scoreColor(t) {
  const hue   = 240 + t * 120;
  const sat   = 60  + t * 40;
  const light = 18  + t * 38;
  return `hsl(${hue}, ${sat}%, ${light}%)`;
}
