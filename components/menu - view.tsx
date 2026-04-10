"use client";

import { MenuCategory } from "@/lib/types";

export function MenuView({ menu }: { menu: MenuCategory[] }) {
  return (
    <div className="page-shell">
      <header className="hero">
        <small>SCAN • VIEW • ENJOY</small>
        <h1>Our Menu</h1>
        <p>Fresh items, clean look, and a smooth mobile experience.</p>
      </header>

      <div className="tabs">
        {menu.map((category) => (
          <button
            key={category.id}
            className="tab"
            onClick={() => {
              document.getElementById(`cat-${category.id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
          >
            {category.name}
          </button>
        ))}
      </div>

      {menu.map((category) => (
        <section id={`cat-${category.id}`} key={category.id} className="menu-section">
          <h2>{category.name}</h2>
          <div className="products-grid">
            {category.products.map((product) => (
              <article className="card" key={product.id}>
                <img
                  className="card-image"
                  src={product.image_url || "/placeholder-food.jpg"}
                  alt={product.name}
                />
                <div className="card-content">
                  <div className="card-top">
                    <h3 className="card-title">{product.name}</h3>
                    <div className="card-price">${Number(product.price).toFixed(2)}</div>
                  </div>
                  <div className="card-desc">{product.description}</div>
                  <div className="badges">
                    {product.is_best_seller ? <span className="badge best">⭐ Best Seller</span> : null}
                    {product.is_spicy ? <span className="badge spicy">🌶 Spicy</span> : null}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}