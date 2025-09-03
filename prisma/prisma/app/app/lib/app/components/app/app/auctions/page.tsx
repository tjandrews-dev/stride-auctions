import { prisma } from '../lib/prisma';
import ListingCard from '../components/ListingCard';

export default async function AuctionsPage(){
  const listings = await prisma.listing.findMany({ where: { saleType: 'AUCTION', category: 'horse' }, orderBy: { endsAt: 'asc' }, take: 24 });
  return (
    <div style={{display:'grid', gap:16}}>
      <section style={{background:'#0B1D39',color:'#fff',padding:16,borderRadius:12}}>
        <h1 style={{fontWeight:700,fontSize:20}}>Stride Auctions</h1>
        <p style={{opacity:.85}}>Racehorse auctions only (demo)</p>
      </section>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))',gap:16}}>
        {listings.map((l:any)=> (
          <ListingCard
            key={l.id}
            id={l.id}
            title={l.title}
            images={JSON.parse(l.images || "[]")}
            category={l.category}
            priceCents={l.priceCents}
            reserveCents={l.reserveCents}
            state={l.state}
            featured={l.featured}
            saleType={l.saleType}
          />
        ))}
      </div>
    </div>
  );
}
