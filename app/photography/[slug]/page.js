import Link from "next/link";
import { notFound } from "next/navigation";
import Images from "@/components/images";
import { collections } from "@/lib/collections";
import styles from "./page.module.css";

export function generateStaticParams() {
  return collections.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const collection = collections.find((item) => item.slug === slug);
  return collection ? { title: `${collection.title} — Jeremy Jakob`, description: collection.description } : {};
}

export default async function Collection({ params }) {
  const { slug } = await params;
  const collection = collections.find((item) => item.slug === slug);
  if (!collection) notFound();
  return (
    <main className={styles.page}>
      <Link href="/" className={styles.back}>← Back to concerts</Link>
      <header className={styles.intro}>
        <p className={styles.eyebrow}>Jeremy Jakob / Photography</p>
        <h1>{collection.title}<span aria-hidden="true">.</span></h1>
        <p className={styles.description}>{collection.description}</p>
      </header>
      <Images items={collection.images} title={collection.title} />
      <nav className={styles.otherCollections} aria-label="Photography collections">
        <Link href="/">Concerts ↗</Link>
        {collections.filter((item) => item.slug !== slug).map((item) => <Link key={item.slug} href={`/photography/${item.slug}`}>{item.title} ↗</Link>)}
      </nav>
    </main>
  );
}
