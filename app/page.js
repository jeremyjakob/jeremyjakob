import Images from "@/components/images";
import { collections } from "@/lib/collections";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.home}>
      <header className={styles.intro}>
        <h1 className={styles.eyebrow}>Concert &amp; event photography</h1>
      </header>
      <Images />
      <section className={styles.collections} aria-labelledby="collections-heading">
        <h2 id="collections-heading">Beyond the stage</h2>
        {collections.map((collection) => (
          <section key={collection.slug} id={collection.slug} className={styles.category} aria-labelledby={`${collection.slug}-heading`}>
            <h3 id={`${collection.slug}-heading`}>{collection.title}</h3>
            <Images items={collection.images} title={collection.title} priorityFirst={false} />
          </section>
        ))}
      </section>
    </main>
  );
}
