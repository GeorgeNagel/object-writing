import styles from './WordPrompt.module.css'

interface WordPromptProps {
  word: string
}

export function WordPrompt({ word }: WordPromptProps) {
  return <h2 className={styles.wordPrompt}>{word}</h2>
}
