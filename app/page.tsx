"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);

  async function loadData() {
    const [catRes, prodRes] = await Promise.all([
      fetch("/api/categories", { cache: "no-store" }),
      fetch("/api/products", { cache: "no-store" }),
    ]);

    const catData = await catRes.json();
    const prodData = await prodRes.json();

    setCategories(catData);
    setProducts(prodData);
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <main className="menu-page">
      <div className="menu-overlay" />

      <div className="menu-content">
        <header className="hero">
          <h1>Restaurant Menu</h1>
        </header>

        {categories.map((cat) => (
          <section key={cat.id} className="menu-section">
            <h2>{cat.name}</h2>

            <div className="menu-grid">
              {products
                .filter((p) => p.category_id === cat.id)
                .map((item) => (
                  <article key={item.id} className="menu-card">
                    <img
                      src={item.image_url || "/placeholder-food.jpg"}
                      className="menu-card-image"
                    />

                    <div className="menu-card-body">
                      <div className="menu-card-top">
                        <h3>{item.name}</h3>
                        <span>${item.price}</span>
                      </div>

                      <p>{item.description}</p>
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