import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";

const navLinks = [
  { label: "Dashboard", path: "/admin/dashboard" },
  { label: "Manage Products", path: "/admin/products" },
  { label: "Manage Orders", path: "/admin/orders" },
];

const emptyForm = {
  name: "",
  price: "",
  description: "",
  image: "",
  category: "",
  stock: "",
  rating: "",
};

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const openAdd = () => {
    setEditingProduct(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = (product) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image,
      category: product.category,
      stock: product.stock,
      rating: product.rating,
    });
    setShowModal(true);
  };

  const handleSubmit = async () => {
    try {
      if (editingProduct) {
        await api.put(`/products/${editingProduct._id}`, form);
      } else {
        await api.post("/products/add", form);
      }
      setShowModal(false);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await api.delete(`/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-zinc-800 px-6 py-10 flex flex-col gap-2 fixed h-full">
        <h2 className="text-xl mb-8 text-[#FF3D5A]">Admin Panel</h2>
        {navLinks.map((link) => (
          <button
            key={link.path}
            onClick={() => navigate(link.path)}
            className="text-left px-4 py-3 rounded-xl text-sm transition hover:bg-zinc-800 hover:text-[#FF3D5A]"
          >
            {link.label}
          </button>
        ))}
      </aside>

      {/* Main */}
      <main className="ml-64 flex-1 px-10 py-10">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-3xl">Manage Products</h1>
          <button
            onClick={openAdd}
            className="px-5 py-2 rounded-xl text-sm font-semibold bg-[#FF3D5A] text-white hover:opacity-90 transition"
          >
            + Add Product
          </button>
        </div>

        {loading ? (
          <p className="text-gray-500">Loading products...</p>
        ) : (
          <div className="rounded-2xl border border-zinc-800 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-zinc-900 text-gray-400 uppercase text-xs tracking-widest">
                <tr>
                  <th className="px-6 py-4 text-left">Image</th>
                  <th className="px-6 py-4 text-left">Name</th>
                  <th className="px-6 py-4 text-left">Category</th>
                  <th className="px-6 py-4 text-left">Price</th>
                  <th className="px-6 py-4 text-left">Stock</th>
                  <th className="px-6 py-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, i) => (
                  <tr
                    key={product._id}
                    className={`border-t border-zinc-800 hover:bg-zinc-900 transition ${
                      i % 2 === 0 ? "bg-black" : "bg-zinc-950"
                    }`}
                  >
                    <td className="px-6 py-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                    </td>
                    <td className="px-6 py-4 text-white font-medium">{product.name}</td>
                    <td className="px-6 py-4 text-gray-400">{product.category}</td>
                    <td className="px-6 py-4 text-white">₹{Number(product.price).toLocaleString()}</td>
                    <td className="px-6 py-4 text-gray-400">{product.stock}</td>
                    <td className="px-6 py-4 flex gap-3">
                      <button
                        onClick={() => openEdit(product)}
                        className="px-3 py-1 rounded-lg border border-zinc-700 text-xs hover:border-[#FF3D5A] hover:text-[#FF3D5A] transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="px-3 py-1 rounded-lg border border-zinc-700 text-xs hover:border-red-500 hover:text-red-500 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-zinc-900 rounded-2xl p-8 w-full max-w-lg border border-zinc-700">
            <h2 className="text-xl mb-6">
              {editingProduct ? "Edit Product" : "Add Product"}
            </h2>

            <div className="flex flex-col gap-4">
              {[
                { label: "Name", name: "name" },
                { label: "Price", name: "price", type: "number" },
                { label: "Description", name: "description" },
                { label: "Image URL", name: "image" },
                { label: "Category", name: "category" },
                { label: "Stock", name: "stock", type: "number" },
                { label: "Rating", name: "rating", type: "number" },
              ].map(({ label, name, type = "text" }) => (
                <div key={name} className="flex flex-col gap-1">
                  <label className="text-xs text-gray-400 uppercase tracking-widest">
                    {label}
                  </label>
                  <input
                    type={type}
                    name={name}
                    value={form[name]}
                    onChange={handleChange}
                    className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white outline-none focus:border-[#FF3D5A] transition text-sm"
                  />
                </div>
              ))}
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSubmit}
                className="flex-1 py-2 rounded-xl bg-[#FF3D5A] text-white text-sm font-semibold hover:opacity-90 transition"
              >
                {editingProduct ? "Update" : "Add Product"}
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-2 rounded-xl border border-zinc-700 text-sm hover:border-[#FF3D5A] hover:text-[#FF3D5A] transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}