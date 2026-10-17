import { notFound, permanentRedirect } from "next/navigation";
import { collections } from "@/lib/collections";

export function generateStaticParams() {
  return [...collections.map(({ slug }) => ({ slug })), { slug: "aviation" }];
}

export default async function Collection({ params }) {
  const { slug } = await params;
  if (slug === "aviation") permanentRedirect("/#people-and-places");
  if (!collections.some((collection) => collection.slug === slug)) notFound();
  permanentRedirect(`/#${slug}`);
}
