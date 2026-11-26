import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-start justify-center bg-bg px-6 py-24 text-ink md:px-16">
      <h1 className="text-5xl font-bold md:text-7xl">Halaman tidak ditemukan</h1>
      <p className="mt-4 max-w-md text-base text-muted">
        Alamat yang kamu tuju belum tersedia. Kembali ke beranda Ruangnamu untuk
        melihat menu, ruang, dan jadwal buka.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex min-h-[44px] items-center bg-accent px-7 py-3.5 text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90"
      >
        Kembali ke Beranda
      </Link>
    </main>
  );
}
