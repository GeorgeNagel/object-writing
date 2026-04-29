import styles from '@/components/RadioGroup.module.css'

interface Option<T> {
  label: string
  value: T
}

interface RadioGroupProps<T extends string | number> {
  name: string
  options: Option<T>[]
  value: T | null
  onChange: (value: T) => void
  disabled?: boolean
}

export function RadioGroup<T extends string | number>({
  name,
  options,
  value,
  onChange,
  disabled = false,
}: RadioGroupProps<T>) {
  return (
    <div className={styles.group}>
      {options.map((option) => (
        <label key={String(option.value)} className={styles.option}>
          <input
            type="radio"
            name={name}
            value={String(option.value)}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
            disabled={disabled}
          />
          {option.label}
        </label>
      ))}
    </div>
  )
}
