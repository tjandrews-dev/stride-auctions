"use client";

import Link from "next/link";
import Image from "next/image";
import Countdown from "./Countdown";

type Props = {
  id: string;
  title: string;
  images?: string[];                 // e.g. ["/horses/ridgeline.jpg"]
  state?: string;                    // e.g. "VIC"
  saleType?: "AUCTION" | "CLASSIFIED";
  priceCents?: number | null;        // classified price
  currentBidCents?: number | null;   // auction current bid
  reserveCents?: number | null;      // auction reserve
  featured?: boolean;
  endTime?: string;                  // ISO string for countdown (auctions)
};

function formatAUD(cents?: number | null) {
  if (cents == null) return "";
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

export default function ListingCard({
  id,
  title,
  images = [],
  state,
  saleType = "CLASSIFIED",
  priceCents = null,
  currentBidCents = null,
  reserveCents = null,
  featured = false,
  endTime,
}: Props) {
  const href = `/listing/${id}`; // adjust when you add a real details page
  const img = images[0] ?? "/placeholder-horse.jpg";

  const reserveMet =
    reserveCents != null &&
    currentBidCents != null &&
    currentBidCents >= reserveCents;

  return (
    <Link
      href={href}
      className="listing-card"
      style={{
        display: "block",
        borderRadius: 16,
        overflow: "hidden",
        background: "white",
        boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
        border: "1px solid rgba(0,0,0,0.06)",
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <div style={{ position: "relative", aspectRatio: "4/3" }}>
        <Image
          src={img}
          alt={title}
          fill
          sizes="(max-width: 600px) 100vw, 33vw"
          style={{ objectFit: "cover" }}
          priority={false}
        />
        {featured && (
          <span
            style={{
              position: "absolute",
              top: 8,
              left: 8,
              padding: "4px 8px",
              borderRadius: 8,
              background: "#0ea5b7", // teal pill
              color: "white",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: 0.3,
            }}
          >
            FEATURED
          </span>
        )}
        {reserveMet && saleType === "AUCTION" && (
          <span
            style={{
              position: "absolute",
              bottom: 8,
              left: 8,
              padding: "4px 8px",
              borderRadius: 8,
              background: "#0b2a57", // navy
              color: "white",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: 0.3,
            }}
          >
            RESERVE MET
          </span>
        )}
      </div>

      <div style={{ padding: 12 }}>
        <div
          style={{
            display: "flex",
            gap: 8,
            alignItems: "baseline",
            justifyContent: "space-between",
          }}
        >
          <h3
            style={{
              margin: 0,
              fontSize: 18,
              lineHeight: "22px",
              fontWeight: 800,
              color: "#0b2a57", // Stride navy
            }}
          >
            {title}
          </h3>
          {state && (
            <span
              style={{
                fontSize: 12,
                color: "#475569",
                border: "1px solid #e2e8f0",
                borderRadius: 8,
                padding: "2px 8px",
              }}
            >
              {state}
            </span>
          )}
        </div>

        {/* Price / Bid row */}
        <div
          style={{
            marginTop: 6,
            display: "flex",
            alignItems: "center",
            gap: 8,
            flexWrap: "wrap",
          }}
        >
          {saleType === "AUCTION" ? (
            <>
              <span style={{ fontSize: 13, color: "#64748b" }}>Current Bid</span>
              <strong style={{ fontSize: 16 }}>
                {formatAUD(currentBidCents ?? 0)}
              </strong>
            </>
          ) : (
            <strong style={{ fontSize: 16 }}>{formatAUD(priceCents ?? 0)}</strong>
          )}
        </div>

        {/* Countdown (ONLY for auctions) */}
        {saleType === "AUCTION" && endTime && (
          <div
            style={{
              marginTop: 6,
              fontSize: 13,
              color: "#0b2a57",
              fontWeight: 700,
            }}
          >
            <Countdown endTime={endTime} />
          </div>
        )}
      </div>
    </Link>
  );
}
