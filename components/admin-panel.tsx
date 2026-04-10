"use client";

import { useEffect, useMemo, useState } from "react";
import { Category, Product } from "@/lib/types";

type AdminState = {
  authenticated: boolean;
  password: string;
};

export function AdminPanel() {
  const [auth, setAuth] = useState<AdminState>({
    authenticated: false,
    password: "",
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const [categoryName, setCategoryName] = useState("");
  const [categorySort, setCategorySort] = useState(0);

  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productSort, setProductSort] = useState(0);
  const [productCategory, setProductCategory] = useState(0);

  const [isBestSeller, setIsBestSeller] = useState(false);
  const [isSpicy, setIsSpicy] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  async function loadData() {
    const [categoriesRes, productsRes] = await Promise.all([
      fetch("/api/categories", { cache: "no-store" }),
      fetch("/api/products", { cache: "no-store" }),
    ]);

    const categoriesData: Category[] = await categoriesRes.json();
    const productsData: Product[] = await productsRes.json();

    setCategories(categoriesData);
    setProducts(productsData);

    if (categoriesData.length > 0 && productCategory === 0) {
      setProductCategory(categoriesData[0].id);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const categoryMap = useMemo<Record<number, string>>(() => {
    const map: Record<number, string> = {};

    for (const category of categories) {
      map[category.id] = category.name;
    }

    return map;
  }, [categories]);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (auth.password === "123456") {
      setAuth({ ...auth, authenticated: true });
      return;
    }

    alert("Wrong password");
  }

  async function addCategory(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: categoryName,
        sort_order: categorySort,
      }),
    });

    setCategoryName("");
    setCategorySort(0);
    await loadData();
    setLoading(false);
  }

  async function uploadImage() {
    if (!file) return "";

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    return data.url || "";
  }

  async function addProduct(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const imageUrl = await uploadImage();

    await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        category_id: productCategory,
        name: productName,
        description: productDescription,
        price: Number(productPrice),
        image_url: imageUrl,
        is_best_seller: isBestSeller,
        is_spicy: isSpicy,
        sort_order: productSort,
      }),
    });

    setProductName("");
    setProductDescription("");
    setProductPrice("");
    setProductSort(0);
    setIsBestSeller(false);
    setIsSpicy(false);
    setFile(null);

    await loadData();
    setLoading(false);
  }

  async function deleteCategory(id: number) {
    await fetch(`/api/categories?id=${id}`, { method: "DELETE" });
    await loadData();
  }

  async function deleteProduct(id: number) {
    await fetch(`/api/products?id=${id}`, { method: "DELETE" });
    await loadData();
  }

  if (!auth.authenticated) {
    return (
      <div className="page-shell">
        <div className="login-box admin-card">
          <h1>Admin Login</h1>
          <p className="muted">Default password in this starter: 123456</p>

          <form className="form-grid" onSubmit={handleLogin}>
            <input
              className="input"
              type="password"
              placeholder="Password"
              value={auth.password}
              onChange={(e) =>
                setAuth({ ...auth, password: e.target.value })
              }
            />
            <button className="btn" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-shell">
      <div className="admin-header">
        <h1>Admin Panel</h1>
        <p>Manage categories, products, images, and menu structure.</p>
      </div>

      <div className="admin-grid">
        <div className="admin-card">
          <h2>Add Category</h2>

          <form className="form-grid" onSubmit={addCategory}>
            <input
              className="input"
              placeholder="Category name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
            <input
              className="input"
              type="number"
              placeholder="Sort order"
              value={categorySort}
              onChange={(e) => setCategorySort(Number(e.target.value))}
            />
            <button className="btn" type="submit" disabled={loading}>
              Add Category
            </button>
          </form>
        </div>

        <div className="admin-card">
          <h2>Add Product</h2>

          <form className="form-grid" onSubmit={addProduct}>
            <select
              className="select"
              value={productCategory}
              onChange={(e) => setProductCategory(Number(e.target.value))}
            >
              {categories.map((category) => (
                <option value={category.id} key={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            <input
              className="input"
              placeholder="Product name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />

            <textarea
              className="textarea"
              placeholder="Description"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
            />

            <input
              className="input"
              type="number"
              step="0.01"
              placeholder="Price"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
            />

            <input
              className="input"
              type="number"
              placeholder="Sort order"
              value={productSort}
              onChange={(e) => setProductSort(Number(e.target.value))}
            />

            <label className="check-row">
              <input
                type="checkbox"
                checked={isBestSeller}
                onChange={(e) => setIsBestSeller(e.target.checked)}
              />
              Best Seller
            </label>

            <label className="check-row">
              <input
                type="checkbox"
                checked={isSpicy}
                onChange={(e) => setIsSpicy(e.target.checked)}
              />
              Spicy
            </label>

            <input
              className="file-input"
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />

            <button className="btn" type="submit" disabled={loading}>
              Add Product
            </button>
          </form>
        </div>
      </div>

      <div className="admin-card" style={{ marginBottom: 18 }}>
        <h2>Categories</h2>

        <div className="list-grid">
          {categories.map((category) => (
            <div className="list-item" key={category.id}>
              <div className="list-left">
                <div>
                  <strong>{category.name}</strong>
                  <br />
                  <span className="muted">Sort: {category.sort_order}</span>
                </div>
              </div>

              <div className="list-actions">
                <button
                  className="btn danger"
                  onClick={() => deleteCategory(category.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="admin-card">
        <h2>Products</h2>

        <div className="list-grid">
          {products.map((product) => (
            <div className="list-item" key={product.id}>
              <div className="list-left">
                <img
                  className="thumb"
                  src={product.image_url || "/placeholder-food.jpg"}
                  alt={product.name}
                />
                <div>
                  <strong>{product.name}</strong>
                  <br />
                  <span className="muted">
                    {categoryMap[product.category_id] ?? "Unknown"} • $
                    {Number(product.price).toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="list-actions">
                <button
                  className="btn danger"
                  onClick={() => deleteProduct(product.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}