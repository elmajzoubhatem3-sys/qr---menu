"use client";

import { useEffect, useMemo, useState } from "react";

type Category = {
  id: number;
  name: string;
};

type Product = {
  id: number;
  category_id: number;
  name: string;
  description: string;
  price: number | string;
  image_url: string;
};

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  async function loadData() {
    const [catRes, prodRes] = await Promise.all([
      fetch("/api/categories"),
      fetch("/api/products"),
    ]);

    setCategories(await catRes.json());
    setProducts(await prodRes.json());
  }

  useEffect(() => {
    loadData();
  }, []);

  const groupedMenu = useMemo(() => {
    return categories.map((cat) => ({
      ...cat,
      items: products.filter(
        (p) => Number(p.category_id) === Number(cat.id)
      ),
    }));
  }, [categories, products]);

  return (
    <main className="relative min-h-screen overflow-hidden">

      {/* 🔥 BLURRED BACKGROUND */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/placeholder-food.jpg')",
          filter: "blur(25px)",
          transform: "scale(1.1)",
        }}
      />

      {/* CONTENT */}
      <div className="relative z-10 p-5">

        {/* HEADER */}
        <header className="text-center mb-6">
          <img
            src="/logo.png"
            className="mx-auto mb-2 h-8 w-8 object-contain"
          />
          <h1 className="text-white text-xl font-bold">
            LAMAR CAFFE
          </h1>
        </header>

        {/* CATEGORIES */}
        <div className="flex gap-3 overflow-x-auto mb-6">
          {groupedMenu.map((cat) => (
            <a
              key={cat.id}
              href={`#cat-${cat.id}`}
              className="bg-white/20 text-white px-5 py-3 rounded-full backdrop-blur-md whitespace-nowrap"
            >
              {cat.name}
            </a>
          ))}
        </div>

        {/* MENU */}
        {groupedMenu.map((cat) => (
          <section key={cat.id} id={`cat-${cat.id}`} className="mb-10">
            <h2 className="text-white text-2xl mb-4">{cat.name}</h2>

            <div className="grid gap-4 sm:grid-cols-2">

              {cat.items.map((item) => (
                <article
                  key={item.id}
                  className="relative overflow-hidden rounded-2xl"
                >

                  {/* IMAGE */}
                  <img
                    src={item.image_url}
                    className="h-[200px] w-full object-cover"
                  />

                  {/* 🔥 GLASS / BLUR AREA */}
                  <div className="absolute bottom-0 w-full p-4
                    bg-gradient-to-t from-black/80 via-black/40 to-transparent
                    backdrop-blur-md">

                    <div className="flex justify-between items-start">
                      <h3 className="text-white font-semibold">
                        {item.name}
                      </h3>

                      <span className="text-yellow-400 font-bold">
                        ${(Number(item.price)).toFixed(2)}
                      </span>
                    </div>

                    {item.description && (
                      <p className="text-white/80 text-sm mt-2">
                        {item.description}
                      </p>
                    )}

                  </div>

                </article>
              ))}

            </div>
          </section>
        ))}

      </div>
    </main>
  );
}