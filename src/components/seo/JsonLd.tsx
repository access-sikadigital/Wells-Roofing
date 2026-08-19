/**
 * Renders JSON-LD blocks into the document.
 * Server component — no client JS cost.
 */
export function JsonLd({ data }: { data: Record<string, unknown>[] }) {
  return (
    <>
      {data.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          // Schema is generated from typed config, never user input.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
    </>
  );
}
