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

      setCategories(await categoriesRes.json());
      setProducts(await productsRes.json());
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const groupedMenu = useMemo(() => {
    return categories.map((category) => ({
      id: category.id,
      category: category.name,
      items: products.filter(
        (p) => Number(p.category_id) === Number(category.id)
      ),
    }));
  }, [categories, products]);

  return (
    <main className="relative min-h-screen overflow-hidden">

      {/* 🔥 الخلفية المغبشة */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/placeholder-food.jpg')",
          filter: "blur(20px)",
          transform: "scale(1.1)",
        }}
      />

      {/* 🔥 المحتوى */}
      <div className="relative z-10 p-6">

        {/* HEADER */}
        <header className="text-center mb-8">
          <img
            src="/logo.png"
            className="mx-auto mb-2 h-8 w-8 object-contain"
          />
          <h1 className="text-white text-xl font-bold">
            LAMAR CAFFE
          </h1>

          <p className="text-white/90 mt-2">
            Fresh meals, beautiful presentation, and a premium dining vibe.
          </p>
        </header>

        {/* CATEGORIES */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {groupedMenu.map((cat) => (
            <a
              key={cat.id}
              href={`#cat-${cat.id}`}
              className="bg-white/20 text-white px-4 py-2 rounded-full backdrop-blur-md"
            >
              {cat.category}
            </a>
          ))}
        </div>

        {/* MENU */}
        {groupedMenu.map((cat) => (
          <section key={cat.id} id={`cat-${cat.id}`} className="mb-10">
            <h2 className="text-white text-2xl mb-4">{cat.category}</h2>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cat.items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl overflow-hidden shadow"
                >
                  <img
                    src={item.image_url}
                    className="h-[180px] w-full object-cover"
                  />

                  <div className="p-3 text-black">
                    <h3 className="font-semibold">{item.name}</h3>

                    <p className="text-sm mt-1">
                      {(Number(item.price) * 90000).toLocaleString()} L.L
                    </p>

                    <p className="text-sm text-gray-600 mt-2">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

      </div>
    </main>
  );
}