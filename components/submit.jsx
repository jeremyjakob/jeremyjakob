import { useFormStatus } from "react-dom";
import styles from "./submit.module.css";

export default function SubmitBtn() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className={styles.button} disabled={pending}>
      <span role={pending ? "status" : undefined}>{pending ? "Sending…" : "Send message"}</span>
      <span aria-hidden="true">↗</span>
    </button>
  );
}
