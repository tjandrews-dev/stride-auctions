import { prisma } from './lib/prisma';
import ListingCard from './components/ListingCard';

export default async function Page(){
  const listings = await prisma.listing.findMany({ orderBy: { createdAt: 'desc' }, take: 24 });
  return (
    <div style={{display:'grid', gap:16}}>
      <section style={{background:'#0B1D39',color:'#fff',padding:16,borderRadius:12}}>
        <h1 style={{fontWeight:700,fontSize:20}}>Stride Equine</h1>
        <p style={{opacity:.85}}>Browse horses, tack, transport & machinery. (demo)</p>
      </section>
      <section>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
          <h2 style={{fontWeight:700}}>Latest Listings</h2>
          <a href="/auctions" style={{color:'#53C0C5',textDecoration:'none'}}>Go to Auctions →</a>
        </div>
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
      </section>
    </div>
  );
}
