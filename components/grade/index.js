import { useState } from "react";
import styles from "./grade.module.scss";

export default function Input({
  value,
  onChange,
  id,
  children,
  name,
  disabled,
}) {
  const [localValue, setLocalValue] = useState(value || 0);

  function handleChange(event) {
    if (onChange) {
      onChange(event);
    }
    setLocalValue(event.target.value);
  }

  return (
    <label htmlFor={id} className={styles.label}>
      {children}
      <input
        className={styles.input}
        type="range"
        min="0"
        max="10"
        step="0.5"
        value={localValue}
        name={name}
        onChange={handleChange}
        disabled={disabled}
      />
      <span className={styles.span}>{localValue}</span>
    </label>
  );
}
