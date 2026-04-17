import words from '@data/words.json'

export function getRandomWord(): string {
  return words[Math.floor(Math.random() * words.length)]
}
