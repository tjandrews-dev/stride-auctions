// prisma/seed.js  (CommonJS)
// Matches schema fields: endsAt (DateTime), saleType (String), category (String),
// images (String JSON array), priceCents/reserveCents (Int), featured (Boolean)

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const cents = (v) => Math.round(Number(v) * 100);

async function main() {
  console.log("🌱 Seeding…");

  // A demo user (seller)
  const seller = await prisma.user.upsert({
    where: { email: 'demo@stride.test' },
    update: {},
    create: { email: 'demo@stride.test', name: 'Demo Seller' },
  });

  // ---------------------------
  // HORSES — AUCTIONS (featured)
  // ---------------------------
  const horses = await Promise.all([
    prisma.listing.create({
      data: {
        title: "Ridgeline",
        description: "Eventing – 16.1hh · Bold and athletic",
        saleType: "AUCTION",
        category: "horse",
        breed: "Thoroughbred",
        discipline: "Eventing",
        state: "VIC",
        reserveCents: cents(15000),
        endsAt: new Date(Date.now() + 6 * 60 * 60 * 1000), // ends in 6h
        images: JSON.stringify(["/horses/ridgeline.jpg"]),
        featured: true,
        userId: seller.id,
      },
    }),
    prisma.listing.create({
      data: {
        title: "Willow",
        description: "Show Jumping – Quiet type with nice technique",
        saleType: "AUCTION",
        category: "horse",
        breed: "Warmblood",
        discipline: "Showjumping",
        state: "NSW",
        reserveCents: cents(22000),
        endsAt: new Date(Date.now() + 12 * 60 * 60 * 1000), // ends in 12h
        images: JSON.stringify(["/horses/willow.jpg"]),
        featured: true,
        userId: seller.id,
      },
    }),
    prisma.listing.create({
      data: {
        title: "Highgrove",
        description: "Leisure – 15.2hh · Kind and straightforward",
        saleType: "AUCTION",
        category: "horse",
        breed: "Thoroughbred",
        discipline: "Leisure",
        state: "QLD",
        reserveCents: cents(10000),
        endsAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // ends in 24h
        images: JSON.stringify(["/horses/highgrove.jpg"]),
        featured: true,
        userId: seller.id,
      },
    }),
  ]);

  // Add sample bids so “Current Bid” shows on cards
  await prisma.bid.createMany({
    data: [
      { userId: seller.id, listingId: horses[0].id, amountCents: cents(15000) },
      { userId: seller.id, listingId: horses[1].id, amountCents: cents(22000) },
      { userId: seller.id, listingId: horses[2].id, amountCents: cents(10000) },
    ],
  });

  // -------------
  // TACK — CLASSIFIED
  // -------------
  await prisma.listing.createMany({
    data: [
      {
        title: 'English Leather Saddle 17.5"',
        description: "Well cared for, supple leather.",
        saleType: "CLASSIFIED",
        category: "tack",
        state: "VIC",
        priceCents: cents(1200),
        images: JSON.stringify(["/tack/saddle.jpg"]),
        userId: seller.id,
      },
      {
        title: "Leather Bridle — Full",
        description: "Soft leather, stainless fittings.",
        saleType: "CLASSIFIED",
        category: "tack",
        state: "SA",
        priceCents: cents(140),
        images: JSON.stringify(["/tack/bridle.jpg"]),
        userId: seller.id,
      },
      {
        title: "Riding Helmet (M)",
        description: "Meets current safety standards.",
        saleType: "CLASSIFIED",
        category: "tack",
        state: "NSW",
        priceCents: cents(80),
        images: JSON.stringify(["/tack/helmet.jpg"]), // use 'boots.jpg' if you have that instead
        userId: seller.id,
      },
    ],
  });

  // -------------------
  // MACHINERY — CLASSIFIED
  // -------------------
  await prisma.listing.createMany({
    data: [
      {
        title: "2-Horse Straight Load Float",
        description: "Well maintained, good brakes, registered.",
        saleType: "CLASSIFIED",
        category: "machinery",
        state: "VIC",
        priceCents: cents(15000),
        images: JSON.stringify(["/machinery/float.jpg"]),
        userId: seller.id,
      },
      {
        title: "Toyota Land Cruiser Ute",
        description: "79 Series, perfect for towing, low kms.",
        saleType: "CLASSIFIED",
        category: "machinery",
        state: "NSW",
        priceCents: cents(85000),
        images: JSON.stringify(["/machinery/ute.jpg"]),
        userId: seller.id,
      },
      {
        title: "John Deere Tractor",
        description: "Reliable workhorse with front-end loader.",
        saleType: "CLASSIFIED",
        category: "machinery",
        state: "QLD",
        priceCents: cents(32000),
        images: JSON.stringify(["/machinery/tractor.jpg"]),
        userId: seller.id,
      },
      {
        title: "Livestock Truck",
        description: "Clean deck, recent service, ready to work.",
        saleType: "CLASSIFIED",
        category: "machinery",
        state: "WA",
        priceCents: cents(68000),
        images: JSON.stringify(["/machinery/truck.jpg"]),
        userId: seller.id,
      },
    ],
  });

  console.log("✅ Seed complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
