import styles from "./input.module.scss";

export default function Input({
  value,
  onChange,
  placeholder,
  type,
  id,
  children,
  name,
  disabled,
}) {
  return (
    <label htmlFor={id} className={styles.label}>
      {children}
      <input
        className={styles.input}
        type={type}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onChange}
        disabled={disabled}
      />
    </label>
  );
}
