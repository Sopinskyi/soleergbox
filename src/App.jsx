import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Gift, ShoppingCart, Sparkles, Leaf, Mail, Phone, Truck, ShieldCheck, ChevronRight, Instagram, CreditCard } from "lucide-react";

// ---- Brand theme ------------------------------------------------------------
const brand = {
  name: "Sole Gifts Co.", // you can change to "Maison Sole" later
  tagline: "Curated holiday & classic gift boxes — made with love, wrapped with care.",
  palette: {
    cranberry: "#7A1C2E",
    green: "#1E4D2B",
    gold: "#C8A968",
    chocolate: "#4B2E22",
    cream: "#FAF7F2",
    onDark: "#F7F5EE",
  },
};

// ---- Dummy catalog ----------------------------------------------------------
const CATALOG = [
  {
    id: "lux-holiday-1",
    name: "Luxury Holiday Cozy Box",
    price: 189,
    compareAt: 219,
    tags: ["Holiday", "Premium"],
    includes: [
      "Cashmere-blend throw",
      "Gourmet fig jam",
      "Honey in glass jar",
      "Ceramic mug",
      "Gingerbread plush with lights",
      "Metal tea tin",
      "Fireplace stocking",
      "Ornaments & festive filler",
    ],
    img: "/_placeholder/holiday1.jpg",
    accent: "cranberry",
  },
  {
    id: "classic-tea-1",
    name: "Classic Tea & Comfort",
    price: 119,
    tags: ["Classic"],
    includes: [
      "Loose-leaf black tea",
      "Honey dipper + honey",
      "Stoneware mug",
      "Butter cookies",
      "Festive ornament",
    ],
    img: "/_placeholder/classic1.jpg",
    accent: "green",
  },
  {
    id: "chocolate-delight-1",
    name: "Chocolate Delight",
    price: 99,
    tags: ["Sweet", "Popular"],
    includes: [
      "Assorted artisan chocolates",
      "Cocoa mix",
      "Candle (vanilla)",
      "Holiday ribbon & filler",
    ],
    img: "/_placeholder/choco1.jpg",
    accent: "chocolate",
  },
  {
    id: "corporate-classic-1",
    name: "Corporate Classic (Bulk)",
    price: 85,
    tags: ["Corporate", "Bulk"],
    includes: [
      "Branded card (optional)",
      "Tea or coffee selection",
      "Cookies",
      "Festive ornament",
    ],
    img: "/_placeholder/corp1.jpg",
    accent: "gold",
  },
];

function AccentTag({ kind, children }) {
  const color = brand.palette[kind] || brand.palette.cranberry;
  return (
    <span className="rounded-full px-2 py-0.5 text-xs" style={{ background: color, color: brand.palette.onDark }}>
      {children}
    </span>
  );
}

function Price({ price, compareAt }) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="text-xl font-semibold">${price}</span>
      {compareAt && (
        <span className="text-sm line-through opacity-60">${compareAt}</span>
      )}
    </div>
  );
}

function PlaceholderImage({ accent }) {
  const color = brand.palette[accent] || brand.palette.cranberry;
  return (
    <div
      className="w-full h-48 rounded-2xl"
      style={{
        background: `linear-gradient(135deg, ${color} 0%, ${brand.palette.gold} 100%)`,
      }}
    />
  );
}

function Feature({ icon: Icon, title, desc }) {
  return (
    <div className="flex gap-3">
      <div className="mt-1"><Icon /></div>
      <div>
        <div className="font-medium">{title}</div>
        <div className="text-sm opacity-80">{desc}</div>
      </div>
    </div>
  );
}

function OrderSheet({ open, onClose, item }) {
  const [qty, setQty] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  if (!open) return null;

  const total = (item?.price || 0) * qty;
  const copyToClipboard = async () => {
    const payload = [
      `Order: ${item?.name}`,
      `Qty: ${qty}`,
      `Total: $${total}`,
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Address: ${address}`,
      note ? `Notes: ${note}` : null,
    ].filter(Boolean).join("\n");
    try {
      await navigator.clipboard.writeText(payload);
      alert("Order details copied. Paste into your email or form!");
    } catch (_) {
      alert("Copy failed — please select & copy manually.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4" role="dialog" aria-modal>
      <div className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-sm uppercase tracking-wider opacity-60">Quick Order</div>
            <h3 className="text-2xl font-semibold mt-1">{item?.name}</h3>
          </div>
          <button className="rounded-full px-3 py-1 bg-gray-100" onClick={onClose}>Close</button>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="space-y-3">
            <label className="block text-sm">Quantity</label>
            <input type="number" min={1} value={qty} onChange={(e)=>setQty(parseInt(e.target.value||"1"))} className="w-full rounded-xl border p-2" />

            <div className="mt-2"><Price price={item.price} compareAt={item.compareAt} /></div>
            <div className="text-lg font-medium">Subtotal: ${total}</div>

            <div className="mt-4 text-xs opacity-70">Payment: Stripe/PayPal/Invoice — configurable. For now, copy order details and send via email or Instagram DM.</div>
          </div>

          <div className="space-y-3">
            <label className="block text-sm">Full name</label>
            <input className="w-full rounded-xl border p-2" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Jane Doe" />

            <label className="block text-sm">Email</label>
            <input className="w-full rounded-xl border p-2" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="you@example.com" />

            <label className="block text-sm">Phone</label>
            <input className="w-full rounded-xl border p-2" value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="(555) 555-5555" />

            <label className="block text-sm">Delivery address</label>
            <textarea className="w-full rounded-xl border p-2" rows={3} value={address} onChange={(e)=>setAddress(e.target.value)} placeholder="Street, City, State, ZIP" />

            <label className="block text-sm">Notes (style, ribbon, color, card text)</label>
            <textarea className="w-full rounded-xl border p-2" rows={2} value={note} onChange={(e)=>setNote(e.target.value)} placeholder="Cranberry ribbon, add card 'Happy Holidays!'" />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <button onClick={copyToClipboard} className="rounded-2xl bg-black px-4 py-2 text-white flex items-center gap-2"><CreditCard size={18}/> Copy order to clipboard</button>
          <a href={`mailto:orders@katee.local?subject=Order: ${encodeURIComponent(item?.name)}&body=${encodeURIComponent(`Qty: ${qty}%0D%0AName: ${name}%0D%0APhone: ${phone}%0D%0AAddress: ${address}%0D%0ANotes: ${note}`)}`} className="text-sm underline">Or email to orders@katee.local</a>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [filter, setFilter] = useState("All");
  const [sheetItem, setSheetItem] = useState(null);
  const tags = useMemo(() => ["All", ...Array.from(new Set(CATALOG.flatMap(i => i.tags)))], []);
  const filtered = useMemo(() => filter === "All" ? CATALOG : CATALOG.filter(i => i.tags.includes(filter)), [filter]);

  return (
    <div className="min-h-screen bg-[color:var(--cream)]" style={{
      // CSS variables for flexible theming
      //@ts-ignore
      "--cranberry": brand.palette.cranberry,
      "--green": brand.palette.green,
      "--gold": brand.palette.gold,
      "--chocolate": brand.palette.chocolate,
      "--cream": brand.palette.cream,
    }}>
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur bg-white/80 border-b">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Gift className="text-[color:var(--cranberry)]"/>
            <span className="font-semibold">{brand.name}</span>
          </div>
          <nav className="hidden md:flex gap-6 text-sm">
            <a href="#catalog" className="hover:opacity-70">Catalog</a>
            <a href="#about" className="hover:opacity-70">About</a>
            <a href="#faq" className="hover:opacity-70">FAQ</a>
            <a href="#contact" className="hover:opacity-70">Contact</a>
          </nav>
          <a href="#catalog" className="rounded-full bg-[color:var(--cranberry)] px-4 py-2 text-white text-sm flex items-center gap-2"><ShoppingCart size={16}/> Shop</a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 py-16 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <motion.h1 initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{duration:0.5}} className="text-4xl md:text-5xl font-semibold leading-tight">
              Hand‑curated <span className="text-[color:var(--cranberry)]">gift boxes</span> for holidays & every day
            </motion.h1>
            <p className="mt-4 text-lg opacity-80">
              Cranberry, green & gold aesthetics. Personal notes, custom ribbons, and careful packaging for local pickup or shipping.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#catalog" className="rounded-2xl bg-[color:var(--cranberry)] px-4 py-2 text-white flex items-center gap-2"><Sparkles size={18}/> Browse boxes</a>
              <a href="#contact" className="rounded-2xl border px-4 py-2 flex items-center gap-2"><Instagram size={18}/> DM to customize</a>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-5">
              <Feature icon={Truck} title="Local & shipping" desc="Pickup or ship within US."/>
              <Feature icon={ShieldCheck} title="Damage-safe" desc="Packed to protect."/>
              <Feature icon={Leaf} title="Small-batch" desc="Curated with care."/>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] rounded-3xl shadow-xl" style={{background: `linear-gradient(135deg, var(--green), var(--gold))`}} />
            <div className="absolute -bottom-6 -left-6 w-28 h-28 rounded-2xl" style={{background: `linear-gradient(135deg, var(--cranberry), var(--gold))`}} />
            <div className="absolute -top-6 -right-6 w-20 h-20 rounded-xl" style={{background: `linear-gradient(135deg, var(--chocolate), var(--gold))`}} />
          </div>
        </div>
      </section>

      {/* Filters */}
      <section id="catalog" className="mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Catalog</h2>
          <div className="flex gap-2">
            {tags.map(t => (
              <button key={t} onClick={()=>setFilter(t)} className={`rounded-full px-3 py-1 text-sm border ${filter===t?"bg-black text-white":"bg-white"}`}>{t}</button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(item => (
            <motion.div key={item.id} initial={{opacity:0, y:10}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.3}} className="rounded-3xl border bg-white p-3">
              <PlaceholderImage accent={item.accent} />
              <div className="p-3 space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-semibold">{item.name}</h3>
                  <Price price={item.price} compareAt={item.compareAt} />
                </div>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tg)=> <AccentTag key={tg} kind={item.accent}>{tg}</AccentTag>)}
                </div>
                <ul className="text-sm opacity-80 list-disc pl-5">
                  {item.includes.slice(0,4).map((x)=> <li key={x}>{x}</li>)}
                  {item.includes.length>4 && <li>+ more inside</li>}
                </ul>
                <div className="flex items-center justify-between pt-2">
                  <button onClick={()=>setSheetItem(item)} className="rounded-xl bg-black px-3 py-2 text-white text-sm flex items-center gap-2"><ShoppingCart size={16}/> Quick order</button>
                  <a href="#" className="text-sm underline flex items-center gap-1">See details <ChevronRight size={14}/></a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="mx-auto max-w-6xl px-4 mt-16 grid md:grid-cols-2 gap-10 items-center">
        <div className="rounded-3xl h-64" style={{background: `linear-gradient(135deg, var(--cranberry), var(--gold))`}} />
        <div>
          <h2 className="text-2xl font-semibold">About {brand.name}</h2>
          <p className="mt-3 opacity-80">
            We design small-batch gift boxes inspired by cozy textures and warm seasonal flavors. Choose a ready-to-ship curation or request a custom mix — we’ll match your preferred color palette (cranberry, green, gold) and add a handwritten card.
          </p>
          <ul className="mt-4 list-disc pl-5 opacity-90 space-y-1">
            <li>Holiday & timeless classic themes</li>
            <li>Corporate bulk options with light branding</li>
            <li>Careful, protective packaging for shipping</li>
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-6xl px-4 mt-16">
        <h2 className="text-2xl font-semibold">FAQ</h2>
        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border p-4">
            <div className="font-medium">Do you ship?</div>
            <div className="text-sm opacity-80 mt-1">Yes — local pickup or US-wide shipping. We pack tightly with protective filler to keep items secure.</div>
          </div>
          <div className="rounded-2xl border p-4">
            <div className="font-medium">Can I customize?</div>
            <div className="text-sm opacity-80 mt-1">Absolutely. Choose ribbon color (cranberry/green/gold), add a message, or swap treats. For bulk, we can include a branded card.</div>
          </div>
          <div className="rounded-2xl border p-4">
            <div className="font-medium">What’s the price range?</div>
            <div className="text-sm opacity-80 mt-1">Popular boxes run $99–$189. Luxury holiday sets may vary based on textiles (throws, stockings) and gourmet items.</div>
          </div>
          <div className="rounded-2xl border p-4">
            <div className="font-medium">How do I order?</div>
            <div className="text-sm opacity-80 mt-1">Use “Quick order” on a product or reach us below — we’ll confirm availability and timing, then send a payment link (Stripe/PayPal/Invoice).</div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-6xl px-4 mt-16">
        <div className="rounded-3xl border p-6 grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h2 className="text-2xl font-semibold">Contact & Custom Orders</h2>
            <p className="opacity-80 mt-2">DM on Instagram for fastest replies, or email us your wishlist and palette. We’ll curate a mockup and confirm pricing.</p>
            <div className="mt-4 flex flex-wrap gap-3 text-sm">
              <a className="rounded-xl border px-3 py-2 flex items-center gap-2" href="#"><Instagram size={16}/> @solegiftsco</a>
              <a className="rounded-xl border px-3 py-2 flex items-center gap-2" href="mailto:hello@solegifts.example"><Mail size={16}/> hello@solegifts.example</a>
              <a className="rounded-xl border px-3 py-2 flex items-center gap-2" href="tel:+15555555555"><Phone size={16}/> +1 (555) 555‑5555</a>
            </div>
          </div>
          <div className="rounded-2xl p-4" style={{background: `linear-gradient(135deg, var(--green), var(--gold))`, color: brand.palette.onDark}}>
            <div className="font-medium">Holiday preorder window</div>
            <div className="text-sm opacity-90">We accept bulk/corporate orders with a 5–7 day lead time. Rush available on request.</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-20 border-t">
        <div className="mx-auto max-w-6xl px-4 py-10 text-sm flex flex-wrap items-center justify-between gap-3">
          <div className="opacity-70">© {new Date().getFullYear()} {brand.name}. All rights reserved.</div>
          <div className="flex gap-4 opacity-70">
            <a href="#">Shipping & Returns</a>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>
        </div>
      </footer>

      <OrderSheet open={!!sheetItem} onClose={()=>setSheetItem(null)} item={sheetItem} />
    </div>
  );
}