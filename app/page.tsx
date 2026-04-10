export default function Home() {
  const menu = [
    {
      category: "Burgers",
      items: [
        {
          name: "Classic Burger",
          price: "$8.00",
          description: "Grilled beef patty, lettuce, tomato, and special sauce",
          image:
            "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1200&auto=format&fit=crop",
        },
        {
          name: "Cheese Burger",
          price: "$9.00",
          description: "Beef patty with melted cheddar cheese and crispy pickles",
          image:
            "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1200&auto=format&fit=crop",
        },
      ],
    },
    {
      category: "Pizza",
      items: [
        {
          name: "Margherita",
          price: "$7.00",
          description: "Fresh mozzarella, basil, and rich tomato sauce",
          image:
            "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?q=80&w=1200&auto=format&fit=crop",
        },
        {
          name: "Pepperoni",
          price: "$10.00",
          description: "Loaded with pepperoni and mozzarella cheese",
          image:
            "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1200&auto=format&fit=crop",
        },
      ],
    },
    {
      category: "Drinks",
      items: [
        {
          name: "Fresh Orange Juice",
          price: "$3.00",
          description: "Freshly squeezed orange juice",
          image:
            "https://images.unsplash.com/photo-1600271886742-f049cd5bba3f?q=80&w=1200&auto=format&fit=crop",
        },
      ],
    },
  ];

  return (
    <main className="menu-page">
      <div className="menu-overlay" />

      <div className="menu-content">
        <header className="hero">
          <span className="hero-badge">SCAN • VIEW • ENJOY</span>
          <h1>Restaurant Menu</h1>
          <p>Fresh meals, beautiful presentation, and a premium dining vibe.</p>
        </header>

        <div className="category-tabs">
          {menu.map((cat, index) => (
            <a key={index} href={`#cat-${index}`} className="category-tab">
              {cat.category}
            </a>
          ))}
        </div>

        {menu.map((cat, index) => (
          <section key={index} id={`cat-${index}`} className="menu-section">
            <h2>{cat.category}</h2>

            <div className="menu-grid">
              {cat.items.map((item, i) => (
                <article key={i} className="menu-card">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="menu-card-image"
                  />

                  <div className="menu-card-body">
                    <div className="menu-card-top">
                      <h3>{item.name}</h3>
                      <span>{item.price}</span>
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