"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");

  async function load() {
    const res = await fetch("/api/categories");
    const data = await res.json();
    setCategories(data);
  }

  useEffect(() => {
    load();
  }, []);

  async function addCategory(e: any) {
    e.preventDefault();

    await fetch("/api/categories", {
      method: "POST",
      body: JSON.stringify({ name }),
      headers: { "Content-Type": "application/json" },
    });

    setName("");
    load();
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Admin</h1>

      <form onSubmit={addCategory}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Category"
        />
        <button>Add</button>
      </form>

      <ul>
        {categories.map((c: any) => (
          <li key={c.id}>{c.name}</li>
        ))}
      </ul>
    </div>
  );
}