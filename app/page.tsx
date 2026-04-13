"use client";

import { useEffect, useMemo, useState } from "react";

type Category = {
  id: number;
  name: string;
  sort_order: number;
};

type Product = {
  id: number;
  category_id: number;
  name: string;
  description: string;
  price: number | string;
  image_url: string;
  sort_order: number;
  is_best_seller: boolean;
  is_spicy: boolean;
};

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  async function loadData() {
    try {
      const [categoriesRes, productsRes] = await Promise.all([
        fetch("/api/categories", { cache: "no-store" }),
        fetch("/api/products", { cache: "no-store" }),
      ]);

      if (!categoriesRes.ok || !productsRes.ok) return;

      const categoriesData: Category[] = await categoriesRes.json();
      const productsData: Product[] = await productsRes.json();

      setCategories(categoriesData);
      setProducts(productsData);
    } catch (error) {
      console.log("Menu load error:", error);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const groupedMenu = useMemo(() => {
    return categories.map((category) => ({
      id: category.id,
      category: category.name,
      items: products
        .filter((product) => Number(product.category_id) === Number(category.id))
        .sort((a, b) => Number(a.sort_order) - Number(b.sort_order)),
    }));
  }, [categories, products]);

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* ORIGINAL IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/placeholder-food.jpg')",
          transform: "scale(1.08)",
        }}
      />

      {/* GLASS / FROSTED LAYER */}
      <div className="absolute inset-0 bg-white/8 backdrop-blur-[20px]" />

      {/* EXTRA SOFT LIGHT */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/5 to-black/10" />

      {/* CONTENT */}
      <div className="relative z-10 px-4 py-6 md:px-8">
        <div className="mx-auto max-w-6xl">
          {/* HEADER */}
          <header className="mb-8 rounded-[2rem] border border-white/25 bg-white/10 px-6 py-10 text-center shadow-lg backdrop-blur-md">
            <div className="mb-4 flex flex-col items-center justify-center">
              <img
                src="/logo.png"
                alt="LAMAR CAFFE"
                className="mb-2 h-7 w-7 object-contain"
              />
              <h1 className="text-xl font-bold text-white">LAMAR CAFFE</h1>
            </div>

            <p className="text-white/90">
              Fresh meals, beautiful presentation, and a premium dining vibe.
            </p>
          </header>

          {/* CATEGORIES */}
          <div className="mb-8 flex flex-wrap justify-center gap-3">
            {groupedMenu.map((cat) => (
              <a
                key={cat.id}
                href={`#cat-${cat.id}`}
                className="rounded-full border border-white/25 bg-white/12 px-5 py-3 text-sm font-medium text-white shadow-md backdrop-blur-md"
              >
                {cat.category}
              </a>
            ))}
          </div>

          {/* MENU */}
          <div className="space-y-10">
            {groupedMenu.map((cat) => (
              <section key={cat.id} id={`cat-${cat.id}`}>
                <h2 className="mb-5 text-2xl font-bold text-white">{cat.category}</h2>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {cat.items.map((item) => (
                    <article
                      key={item.id}
                      className="overflow-hidden rounded-2xl bg-white shadow-md"
                    >
                      <img
                        src={item.image_url || "/placeholder-food.jpg"}
                        alt={item.name}
                        className="h-[180px] w-full object-cover"
                      />

                      <div className="p-4 text-black">
                        <h3 className="text-lg font-semibold">{item.name}</h3>

                        <p className="mt-1 text-sm text-black/70">
                          {(Number(item.price) * 90000).toLocaleString()} L.L
                        </p>

                        <p className="mt-2 text-sm text-black/60">{item.description}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}