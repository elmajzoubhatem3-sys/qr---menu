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
    <main
      className="menu-page relative min-h-screen overflow-hidden"
      style={{
        backgroundImage: "url('/placeholder-food.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* FULL BACKGROUND BLUR */}
      <div className="absolute inset-0 bg-white/30 backdrop-blur-xl" />

      <div className="menu-content relative z-10">
        {/* 🔥 HEADER */}
        <header className="hero relative overflow-hidden rounded-[2rem] mb-8">
          {/* CONTENT */}
          <div className="relative z-10 px-6 py-12 text-white text-center">
            <div className="flex flex-col items-center justify-center mb-4">
              <img src="/logo.png" className="h-10 w-10 object-contain mb-2" />
              <h1 className="text-xl font-bold">LAMAR CAFFE</h1>
            </div>

            <p>Fresh meals, beautiful presentation, and a premium dining vibe.</p>
          </div>
        </header>

        {/* CATEGORIES */}
        <div className="category-tabs">
          {groupedMenu.map((cat) => (
            <a key={cat.id} href={`#cat-${cat.id}`} className="category-tab">
              {cat.category}
            </a>
          ))}
        </div>

        {/* MENU */}
        {groupedMenu.map((cat) => (
          <section key={cat.id} id={`cat-${cat.id}`} className="menu-section">
            <h2>{cat.category}</h2>

            <div className="menu-grid">
              {cat.items.map((item) => (
                <article
                  key={item.id}
                  className="menu-card bg-white rounded-2xl shadow-md overflow-hidden"
                >
                  <img
                    src={item.image_url || "/placeholder-food.jpg"}
                    alt={item.name}
                    className="w-full h-[180px] object-cover"
                  />

                  <div className="p-4 text-black">
                    <h3 className="text-lg font-semibold">{item.name}</h3>

                    <p className="text-sm mt-1 text-black/70">
                      {(Number(item.price) * 90000).toLocaleString()} L.L
                    </p>

                    <p className="text-sm mt-2 text-black/60">{item.description}</p>
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