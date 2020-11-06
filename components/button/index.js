import { forwardRef } from "react";
import styles from "./button.module.scss";

function Button({ onClick, children, variant, type }, ref) {
  return (
    <button
      ref={ref}
      type={type}
      onClick={onClick}
      className={styles[variant || "contained"]}
    >
      {children}
    </button>
  );
}

export default forwardRef(Button);
