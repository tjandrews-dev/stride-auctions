import { prisma } from '../../lib/prisma';

export default async function ListingDetail({ params }: { params: { id: string } }){
  const l:any = await prisma.listing.findUnique({ where: { id: params.id } });
  if(!l) return <div>Not found</div>;
  const images:string[] = JSON.parse(l.images || "[]");
  return (
    <div style={{display:'grid', gap:24, gridTemplateColumns:'1fr', maxWidth:1000, margin:'0 auto'}}>
      <div>
        {images.map((src,i)=> (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={i} src={src} alt={l.title} style={{width:'100%',borderRadius:12,marginBottom:12,border:'1px solid #e5e7eb'}} />
        ))}
      </div>
      <div>
        <div style={{fontSize:12,background:'#f3f4f6',display:'inline-block',padding:'2px 8px',borderRadius:8,textTransform:'capitalize'}}>{l.category}</div>
        <h1 style={{fontSize:24,fontWeight:700,margin:'8px 0'}}>{l.title}</h1>
        <p style={{color:'#6b7280',whiteSpace:'pre-line'}}>{l.description}</p>
        <div style={{fontSize:18,fontWeight:700,marginTop:8}}>
          {l.saleType==='CLASSIFIED' && l.priceCents ? `$${(l.priceCents/100).toLocaleString()}` : null}
          {l.saleType==='AUCTION' && l.reserveCents ? `Reserve: $${(l.reserveCents/100).toLocaleString()}` : null}
        </div>
        <div style={{fontSize:12,color:'#6b7280',marginTop:4}}>State: {l.state ?? '—'}</div>
        {l.saleType==='AUCTION'
          ? <button style={{background:'#53C0C5',color:'#fff',padding:'10px 14px',borderRadius:8,marginTop:12}}>Place Bid (demo)</button>
          : <button style={{background:'#53C0C5',color:'#fff',padding:'10px 14px',borderRadius:8,marginTop:12}}>Contact Seller (demo)</button>
        }
      </div>
    </div>
  );
}
