export const metadata = { title: 'Stride', description: 'Stride Auctions & Stride Equine' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{margin:0,fontFamily:'system-ui,Segoe UI,Arial,sans-serif'}}>
        <header style={{background:'#0B1D39',color:'#fff'}}>
          <div style={{maxWidth:1040,margin:'0 auto',padding:'12px 16px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div style={{fontWeight:700}}>Stride</div>
            <nav style={{display:'flex',gap:12,opacity:.9,fontSize:14}}>
              <a href="/" style={{color:'#fff',textDecoration:'none'}}>Equine</a>
              <a href="/auctions" style={{color:'#fff',textDecoration:'none'}}>Auctions</a>
            </nav>
          </div>
        </header>
        <main style={{maxWidth:1040,margin:'0 auto',padding:'24px 16px'}}>{children}</main>
        <footer style={{maxWidth:1040,margin:'0 auto',padding:'40px 16px',textAlign:'center',color:'#6b7280',fontSize:12}}>© {new Date().getFullYear()} Stride</footer>
      </body>
    </html>
  );
}
