import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-svh max-w-2xl flex-col items-start justify-center px-4 sm:px-6">
      <h1 className="display-lg">Halaman tidak ditemukan</h1>
      <p className="body-lg mt-4 text-muted">
        Alamat yang kamu buka tidak ada di situs ini. Mungkin tautannya salah ketik, atau
        halamannya sudah dipindah.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block rounded-sm bg-joglo px-7 py-3.5 text-base font-semibold text-paper transition-opacity hover:opacity-90"
      >
        Kembali ke beranda
      </Link>
    </main>
  );
}
