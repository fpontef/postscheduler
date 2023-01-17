import styles from './styles.module.css';

export function TextInput(props) {
  const { title, name, type, value, placeholder, onChange, ...rest } = props;

  return (
    <div className={styles.inputContainer}>
      <label htmlFor={name} />
      <div className={styles.titleInput}>{title}</div>
      <input
        className={styles.textInput}
        id={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        {...rest}
      />
    </div>
  );
}
