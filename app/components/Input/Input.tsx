import React, { ChangeEvent } from "react";
import styles from "./Input.module.scss";

interface InputProps {
  type: string;
  label: string;
  value?: string;
  defaultValue?: string;
  name: string;
  onChange?: (name: string, value: string) => void;
}

const Input: React.FC<InputProps> = ({
  type,
  label,
  name,
  value,
  onChange,
  defaultValue,
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(event.target.name, event.target.value);
  };

  return (
    <div className={styles.input}>
      <label>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        defaultValue={defaultValue}
        onChange={handleChange}
      />
    </div>
  );
};

export default Input;
