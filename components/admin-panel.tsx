return (
  <div className="admin-shell">
    <div className="admin-header">
      <h1>Admin Dashboard</h1>
      <p>Manage your menu easily</p>
    </div>

    <div className="admin-grid">
      {/* ADD CATEGORY */}
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

          <button className="btn primary" type="submit">
            Add Category
          </button>
        </form>
      </div>

      {/* ADD PRODUCT */}
      <div className="admin-card">
        <h2>Add Product</h2>

        <form className="form-grid" onSubmit={addProduct}>
          <select
            className="select"
            value={productCategory}
            onChange={(e) => setProductCategory(Number(e.target.value))}
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
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
            placeholder="Price"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          />

          <input
            className="file-input"
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />

          <button className="btn primary" type="submit">
            Add Product
          </button>
        </form>
      </div>
    </div>

    {/* CATEGORIES */}
    <div className="admin-card">
      <h2>Categories</h2>

      {categories.map((c) => (
        <div key={c.id} className="list-item">
          <span>{c.name}</span>
          <button className="btn danger" onClick={() => deleteCategory(c.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>

    {/* PRODUCTS */}
    <div className="admin-card">
      <h2>Products</h2>

      {products.map((p) => (
        <div key={p.id} className="list-item">
          <div className="admin-product-left">
            <img
              className="thumb"
              src={p.image_url || "/placeholder-food.jpg"}
            />
            <span>{p.name}</span>
          </div>

          <button className="btn danger" onClick={() => deleteProduct(p.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  </div>
);