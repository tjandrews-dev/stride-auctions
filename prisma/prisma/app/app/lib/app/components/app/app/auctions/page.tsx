import { prisma } from "./lib/prisma";
import ListingCard from "./components/ListingCard";

export default async function Home() {
  const featured = await prisma.listing.findMany({
    where: { featured: true, saleType: "AUCTION", category: "HORSE" },
    orderBy: { createdAt: "desc" },
    take: 3,
  });

  return (
    <div style={{ display: "grid", gap: 20 }}>
      <h2 style={{ margin: "6px 0", color: "#0B1D39" }}>Featured Horses</h2>
      <div
        className="grid"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}
      >
        {featured.map((l) => (
          <ListingCard
            key={l.id}
            id={l.id}
            title={l.title}
            images={JSON.parse(l.images || "[]")}
            state={l.state}
            saleType={l.saleType as "AUCTION" | "CLASSIFIED"}
            priceCents={l.priceCents}
            currentBidCents={l.currentBidCents}
            reserveCents={l.reserveCents}
            featured={l.featured}
            endTime={l.endTime ? l.endTime.toISOString() : undefined}
          />
        ))}
      </div>
    </div>
  );
}
