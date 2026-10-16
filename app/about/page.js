import Image from "next/image";
import Link from "next/link";
import jeremy from "@/public/images/jeremy.png";
import styles from "./page.module.css";

export const metadata = {
  title: "About — Jeremy Jakob",
  description: "Meet Jeremy Jakob, a concert and event photographer. Explore selected work or get in touch about a project.",
};

export default function About() {
  return (
    <main className={styles.about}>
      <header className={styles.intro}>
        <p className={styles.eyebrow}>Jeremy Jakob / About</p>
        <h1>Behind the<br />camera<span aria-hidden="true">.</span></h1>
      </header>
      <div className={styles.layout}>
        <figure className={styles.portrait}>
          <Image
            src={jeremy}
            alt="Jeremy Jakob holding a camera to his face in a black-and-white mirror portrait."
            sizes="(max-width: 700px) calc(100vw - 40px), (max-width: 1128px) calc((100vw - 160px) / 2), 484px"
            quality={85}
            priority
            className={styles.image}
          />
          <figcaption><span>On the other side of the lens</span><span>Jeremy Jakob</span></figcaption>
        </figure>
        <section className={styles.biography} aria-labelledby="name-heading">
          <p className={styles.smallLabel}>The photographer</p>
          <h2 id="name-heading">I’m Jeremy Jakob.</h2>
          <p className={styles.lead}>A concert and event photographer.</p>
          <p className={styles.description}>
            This portfolio brings together a selection of my work in live music
            and event photography: the performances, the people on stage, and
            the atmosphere around them.
          </p>
          <dl className={styles.details}>
            <div><dt>Focus</dt><dd>Concerts &amp; events</dd></div>
            <div><dt>Portfolio</dt><dd>A curated selection of photographs</dd></div>
          </dl>
          <div className={styles.links}>
            <Link href="/" className={styles.primaryLink}>Explore the photographs <span aria-hidden="true">↗</span></Link>
            <Link href="/contact" className={styles.secondaryLink}>Have a project in mind? <span aria-hidden="true">↗</span></Link>
          </div>
        </section>
      </div>
    </main>
  );
}
