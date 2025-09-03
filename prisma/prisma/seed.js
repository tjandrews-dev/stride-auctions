const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const cents = (v) => Math.round(Number(v) * 100);

async function main() {
  console.log('Seeding…');

  const user = await prisma.user.upsert({
    where: { email: 'demo@stride.test' },
    update: {},
    create: { email: 'demo@stride.test', name: 'Demo Seller' }
  });

  const listings = [
    {
      title: '2021 Bay Colt — OTT Thoroughbred',
      description: 'Off-the-track, kind temperament, great prospect for eventing.',
      saleType: 'AUCTION',
      category: 'horse',
      breed: 'Thoroughbred',
      discipline: 'Eventing',
      state: 'VIC',
      reserveCents: cents(5000),
      endsAt: new Date(Date.now() + 1000*60*60*24*3),
      images: JSON.stringify(['https://picsum.photos/seed/stride1/800/600','https://picsum.photos/seed/stride2/800/600']),
      featured: true
    },
    {
      title: 'Warmblood Gelding — Showjumper',
      description: 'Scopey jumper, brave and careful. Ready to compete.',
      saleType: 'CLASSIFIED',
      category: 'horse',
      breed: 'Warmblood',
      discipline: 'Showjumping',
      state: 'QLD',
      priceCents: cents(25000),
      images: JSON.stringify(['https://picsum.photos/seed/stride4/800/600']),
      featured: true
    },
    {
      title: '17.5” Close Contact Saddle',
      description: 'Lightweight, excellent condition.',
      saleType: 'CLASSIFIED',
      category: 'tack',
      state: 'NSW',
      priceCents: cents(850),
      images: JSON.stringify(['https://picsum.photos/seed/stride6/800/600'])
    },
    {
      title: '2-Horse Straight Load Float',
      description: 'Serviced, new tyres, clean floor & mats.',
      saleType: 'CLASSIFIED',
      category: 'transport',
      state: 'VIC',
      priceCents: cents(9500),
      images: JSON.stringify(['https://picsum.photos/seed/stride8/800/600']),
      featured: true
    }
  ];

  for (const l of listings) {
    await prisma.listing.create({ data: { ...l, userId: user.id } });
  }

  console.log('Seed OK');
}

main()
  .catch((e) => { console.error('SEED ERROR:', e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
