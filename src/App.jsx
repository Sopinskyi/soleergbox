import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const brand = {
  cream: "#FAF7F2",
  text: "#1E1E1E",
  cranberry: "#7A1C2E",
  green: "#1E4D2B",
  gold: "#C8A968",
  chocolate: "#4B2E22",
};

export default function App() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen" style={{ background: brand.cream, color: brand.text }}>
      {/* Background image */}
      <div
        className="fixed inset-0 -z-10 bg-center bg-cover"
        style={{ backgroundImage: "url('/bg-gift-basket.jpg')" }}
        aria-hidden="true"
      />
      {/* Soft gradient wash so text stays readable */}
      <div className="fixed inset-0 -z-10 bg-[rgba(250,247,242,0.80)]" aria-hidden="true" />

      {/* Top nav */}
      <header className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="/logo-maison-sole.png"
            alt="Maison Solé"
            className="h-12 w-auto rounded-md shadow-sm ring-1 ring-black/5 object-contain bg-cream"
            style={{ backgroundColor: brand.cream }}
          />
          <div className="hidden sm:block">
            <div className="brand-serif text-xl tracking-wide" style={{ color: brand.cranberry }}>
              MAISON SOLÉEEEE
            </div>
            <div className="text-sm" style={{ color: brand.green }}>Holiday Gift Boxes</div>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a href="#about" className="hover:opacity-80">About</a>
          <a href="#catalog" className="hover:opacity-80">Catalog</a>
          <a href="#contact" className="hover:opacity-80">Contact</a>
          <button
            onClick={() => setOpen(true)}
            className="rounded-full px-5 py-2.5 text-sm font-medium shadow-sm"
            style={{ background: brand.gold, color: "#1A1A1A" }}
          >
            Order a Giftbox
          </button>
        </nav>
      </header>

      {/* Hero */}
      <main className="max-w-6xl mx-auto px-4">
        <section className="grid lg:grid-cols-2 gap-10 items-center pt-8 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-6"
          >
            <h1 className="brand-serif text-4xl sm:text-5xl lg:text-6xl leading-tight"
                style={{ color: brand.cranberry }}>
              Hand-curated gift boxes<br />for holidays & every day
            </h1>

            <p className="max-w-xl text-base sm:text-lg">
              Cranberry, green & gold aesthetics. Personal notes, custom ribbons, and careful
              packaging for local pickup or shipping across the U.S.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setOpen(true)}
                className="rounded-full px-6 py-3 text-sm sm:text-base font-medium shadow-md hover:-translate-y-0.5 transition"
                style={{ background: brand.gold, color: "#1A1A1A" }}
              >
                Order a Giftbox
              </button>

              <a
                href="#catalog"
                className="rounded-full px-6 py-3 text-sm sm:text-base font-medium ring-1 hover:opacity-80"
                style={{ color: brand.cranberry, borderColor: brand.cranberry }}
              >
                Browse Catalog
              </a>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 text-sm">
              <Badge title="Damage-safe packaging" />
              <Badge title="Local pickup & shipping" />
              <Badge title="Small-batch, curated with care" />
            </div>
          </motion.div>

          {/* Luxe card with subtle motion */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6, ease: "easeOut" }}
          >
            <div className="rounded-3xl overflow-hidden shadow-xl ring-1 ring-black/5 bg-white/70 backdrop-blur-sm">
              <img
                src="/bg-gift-basket.jpg"
                alt="Cozy gift basket"
                className="w-full h-[420px] object-cover"
              />
              <div className="p-6 sm:p-8">
                <h3 className="brand-serif text-2xl" style={{ color: brand.cranberry }}>
                  Cozy Holiday Box
                </h3>
                <p className="mt-2 text-sm">
                  Fig jam from France, wildflower honey, artisan chocolate, seasonal tea, and
                  a soft throw — presented with festive accents.
                </p>

                <div className="mt-5 flex items-center gap-3">
                  <span className="text-lg font-semibold">$189</span>
                  <span className="text-sm line-through opacity-60">$219</span>
                  <span className="ml-2 text-xs rounded-full px-2 py-1"
                        style={{ background: brand.cranberry, color: "white" }}>
                    Holiday — Premium
                  </span>
                </div>

                <div className="mt-6">
                  <button
                    onClick={() => setOpen(true)}
                    className="w-full rounded-xl px-6 py-3 font-medium shadow-sm hover:-translate-y-0.5 transition"
                    style={{ background: brand.cranberry, color: "white" }}
                  >
                    Quick Order
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Minimal catalog anchor (placeholder) */}
        <section id="catalog" className="pb-24">
          <h2 className="brand-serif text-3xl mb-6" style={{ color: brand.cranberry }}>
            Catalog
          </h2>
          <p className="opacity-80">
            More boxes coming soon. Need something special?{" "}
            <a href="#contact" className="underline" style={{ color: brand.cranberry }}>
              DM to customize
            </a>.
          </p>
        </section>

        {/* Contact anchor */}
        <footer id="contact" className="pb-16 text-sm opacity-80">
          <div>Instagram: <span className="underline">Maison Solé</span></div>
          <div>Email: hello@maisonsole.com</div>
        </footer>
      </main>

      {/* Order modal */}
      <AnimatePresence>
        {open && (
          <OrderModal onClose={() => setOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------- Components ---------- */

function Badge({ title }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className="inline-block h-2.5 w-2.5 rounded-full"
        style={{ background: "#8BC4A0" }}
      />
      <span className="text-[13px]">{title}</span>
    </div>
  );
}

function OrderModal({ onClose }) {
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    const fd = new FormData(e.currentTarget);
    const payload = {
      giftboxId: fd.get("giftboxId"),
      email: fd.get("email"),
      addressTime: fd.get("addressTime"),
    };
    // TODO: replace with real endpoint / Formspree / EmailJS
    console.log("Order:", payload);
    setTimeout(() => {
      setSubmitting(false);
      onClose();
      alert("Thank you! We’ll confirm your order shortly.");
    }, 700);
  }

  return (
    <motion.div
      className="fixed inset-0 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      {/* Panel */}
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 8, scale: 0.98 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        className="relative mx-auto mt-24 w-[92%] max-w-lg rounded-2xl bg-white shadow-xl ring-1 ring-black/5 p-6 sm:p-8"
      >
        <div className="flex items-start justify-between">
          <h3 className="brand-serif text-2xl" style={{ color: brand.cranberry }}>
            Order a Giftbox
          </h3>
          <button
            onClick={onClose}
            className="ml-4 rounded-full px-3 py-1 text-sm hover:bg-neutral-100"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <Field label="Giftbox ID">
            <input
              name="giftboxId"
              required
              placeholder="e.g., HOLIDAY-PREMIUM-01"
              className="w-full rounded-lg border border-black/10 px-3 py-2.5 outline-none focus:ring-2"
              style={{ focusRingColor: brand.cranberry }}
            />
          </Field>

          <Field label="Email address">
            <input
              type="email"
              name="email"
              required
              placeholder="you@email.com"
              className="w-full rounded-lg border border-black/10 px-3 py-2.5 outline-none focus:ring-2"
            />
          </Field>

          <Field label="Delivery address & preferred time">
            <textarea
              name="addressTime"
              required
              rows={4}
              placeholder="Street, city, state, ZIP. Preferred date & time window."
              className="w-full rounded-lg border border-black/10 px-3 py-2.5 outline-none focus:ring-2"
            />
          </Field>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-xl px-5 py-3 font-medium shadow-sm disabled:opacity-70"
            style={{ background: brand.cranberry, color: "white" }}
          >
            {submitting ? "Submitting…" : "Submit Order"}
          </button>

          <p className="text-xs opacity-60 text-center">
            We’ll email you to confirm availability, payment, and delivery details.
          </p>
        </form>
      </motion.div>
    </motion.div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <div className="mb-1.5 text-sm font-medium">{label}</div>
      {children}
    </label>
  );
}