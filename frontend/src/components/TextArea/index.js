import styles from './styles.module.css';

export function TextArea(props) {
  const { title, name, type, value, placeholder, onChange, ...rest } = props;

  return (
    <div className={styles.inputContainer}>
      <label htmlFor={name} />
      <div className={styles.titleInput}>{title}</div>
      <textarea
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
