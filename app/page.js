import Images from "@/components/images";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.home}>
      <header className={styles.intro}>
        <div>
          <p className={styles.eyebrow}>Concert &amp; event photography</p>
          <h1>Jeremy Jakob<span aria-hidden="true">.</span></h1>
        </div>
        <p className={styles.note}>Live music. People. Atmosphere.</p>
      </header>
      <Images />
    </main>
  );
}
