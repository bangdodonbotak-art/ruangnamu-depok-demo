"use client";

import { motion } from "motion/react";
import { SITE_DATA } from "@/lib/site-data";
import { useReducedMotion } from "@/lib/motion";

export function Services() {
  const featured = SITE_DATA.menuItems.filter((item) => item.featured);
  const others = SITE_DATA.menuItems.filter((item) => !item.featured);
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="services"
      className="border-b border-line bg-bg px-6 py-16 md:px-16 lg:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <div>
          <h2 className="text-4xl font-semibold text-ink md:text-[3.5rem]">
            Menu pilihan dapur
          </h2>
          <p className="mt-3 max-w-md text-sm text-muted">
            Harga dikonfirmasi langsung saat memesan — tanya lewat formulir
            reservasi di bawah.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-12">
          {featured.map((item, idx) => (
            <motion.article
              key={item.id}
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { duration: 0.6, ease: "easeOut", delay: idx * 0.12 }
              }
              className={`flex flex-col justify-between border border-line bg-surface p-7 ${
                idx === 0 ? "lg:col-span-6" : "lg:col-span-3"
              }`}
            >
              <div>
                <p className="text-xs font-medium text-muted">
                  {item.category}
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-ink">
                  {item.name}
                </h3>
                <p className="mt-3 text-sm text-muted">{item.description}</p>
              </div>
              <div className="mt-8 border-t border-line pt-4">
                {item.priceText ? (
                  <p className="text-base font-semibold text-ink">
                    {item.priceText}{" "}
                    <span className="text-xs font-normal text-muted">
                      / {item.basisText}
                    </span>
                  </p>
                ) : (
                  <a
                    href="#booking"
                    className="inline-flex min-h-[44px] items-center text-sm font-semibold text-accent underline underline-offset-4"
                  >
                    Tanya harga
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-8 divide-y divide-line border border-line bg-bg">
          {others.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between gap-3 px-6 py-5 sm:flex-row sm:items-center"
            >
              <div>
                <h3 className="text-xl font-semibold text-ink">{item.name}</h3>
                <p className="mt-1 text-sm text-muted">
                  {item.category} — {item.description}
                </p>
              </div>
              <div className="shrink-0 text-left sm:text-right">
                {item.priceText ? (
                  <p className="text-base font-semibold text-ink">
                    {item.priceText}{" "}
                    <span className="block text-xs font-normal text-muted">
                      {item.basisText}
                    </span>
                  </p>
                ) : (
                  <p className="text-sm text-muted">{item.basisText}</p>
                )}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted">
          Semua harga dikonfirmasi saat reservasi — tanya lewat formulir di
          bawah.
        </p>
      </div>
    </section>
  );
}
