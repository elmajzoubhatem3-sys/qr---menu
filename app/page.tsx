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
    <main className="menu-page">
      <div className="menu-overlay" />

      <div className="menu-content">
        <header className="hero text-center">
          <img
            src="/logo.png"
            alt="LAMAR CAFFE"
            className="mx-auto mb-3 h-2 w-2 object-contain"
          />
          <span className="hero-badge">SCAN • VIEW • ENJOY</span>
          <h1>LAMAR CAFFE</h1>
          <p>Fresh meals, beautiful presentation, and a premium dining vibe.</p>
        </header>

        <div className="category-tabs">
          {groupedMenu.map((cat) => (
            <a key={cat.id} href={`#cat-${cat.id}`} className="category-tab">
              {cat.category}
            </a>
          ))}
        </div>

        {groupedMenu.map((cat) => (
          <section key={cat.id} id={`cat-${cat.id}`} className="menu-section">
            <h2>{cat.category}</h2>

            <div className="menu-grid">
              {cat.items.map((item) => (
                <div key={item.id}>
                  <div className="menu-card">
                    <img
                      src={item.image_url || "/placeholder-food.jpg"}
                      alt={item.name}
                      className="menu-card-image"
                    />
                  </div>

                  <div className="mt-2 px-1 text-white">
                    <h3>{item.name}</h3>

                    <p className="mt-1">
                      {(Number(item.price) * 90000).toLocaleString()} L.L
                    </p>

                    <p>{item.description}</p>
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