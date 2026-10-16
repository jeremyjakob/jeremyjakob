import Image from "next/image";
import Link from "next/link";
import concert from "@/public/images/jj1.jpg";
import styles from "./page.module.css";

export const metadata = {
  title: "Blog — Jeremy Jakob",
  description: "Photo essays, concert stories, and notes on photography by Jeremy Jakob.",
};

export default function Blog() {
  return (
    <main className={styles.blog}>
      <header className={styles.intro}>
        <p className={styles.eyebrow}>Jeremy Jakob / Photography</p>
        <h1>Blog<span aria-hidden="true">.</span></h1>
        <p className={styles.description}>
          Photographs, stories, and notes from behind the camera.
        </p>
      </header>
      <figure className={styles.photograph}>
        <Image
          src={concert}
          alt="Musicians performing together on a small stage, photographed in black and white."
          sizes="(max-width: 768px) calc(100vw - 40px), (max-width: 1128px) calc(100vw - 96px), 1032px"
          quality={85}
          priority
          className={styles.image}
        />
        <figcaption>
          <span>Through the lens</span>
          <span>Jeremy Jakob</span>
        </figcaption>
      </figure>
      <section className={styles.entries} aria-labelledby="entries-heading">
        <div className={styles.sectionHeading}>
          <h2 id="entries-heading">Latest entries</h2>
          <span>Photo essays &amp; field notes</span>
        </div>
        <div className={styles.emptyState}>
          <p className={styles.emptyTitle}>A little more behind the photographs.</p>
          <p>
            This is a space for stories from the shows, photographs worth spending
            time with, and notes on the process. The first entries are still to come.
          </p>
          <Link href="/" className={styles.portfolioLink}>
            Explore the photographs <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
