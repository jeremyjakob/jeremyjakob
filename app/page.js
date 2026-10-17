import Images from "@/components/images";
import Image from "next/image";
import Link from "next/link";
import { collections } from "@/lib/collections";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.home}>
      <header className={styles.intro}>
        <div>
          <p className={styles.eyebrow}>Concert &amp; event photography</p>
          <h1>Jeremy Jakob<span aria-hidden="true">.</span></h1>
        </div>
      </header>
      <Images />
      <section className={styles.collections} aria-labelledby="collections-heading">
        <h2 id="collections-heading">Beyond the stage</h2>
        <div className={styles.collectionGrid}>
          {collections.map((collection) => (
            <Link key={collection.slug} href={`/photography/${collection.slug}`} className={styles.collectionLink}>
              <Image src={collection.images[0].imageUrl} alt={collection.images[0].description} sizes="(max-width: 650px) calc((100vw - 50px) / 2), (max-width: 1216px) calc((100vw - 144px) / 3), 357px" quality={85} className={styles.collectionCover} />
              <span>{collection.title} <span aria-hidden="true">↗</span></span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
