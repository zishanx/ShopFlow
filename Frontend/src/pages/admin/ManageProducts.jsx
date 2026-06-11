import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
  const [submitting, setSubmitting] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState(emptyForm);
  
  const navigate = useNavigate();
  const location = useLocation();

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
      name: product.name || "",
      price: product.price || "",
      description: product.description || "",
      image: product.image || "",
      category: product.category || "",
      stock: product.stock || "",
      rating: product.rating || "",
    });
    setShowModal(true);
  };

  const handleSubmit = async () => {
    if (!form.name || !form.price) {
      alert("Name and Price are required fields.");
      return;
    }
    try {
      setSubmitting(true);
      if (editingProduct) {
        await api.put(`/products/${editingProduct._id}`, form);
      } else {
        await api.post("/products/add", form);
      }
      setShowModal(false);
      fetchProducts();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product permanently?")) return;
    try {
      await api.delete(`/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-zinc-800 px-4 sm:px-6 py-6 md:py-10 flex flex-col md:fixed md:h-full bg-black z-10">
        <h2 className="text-xl font-bold mb-4 md:mb-8 text-[#FF3D5A] tracking-tight text-center md:text-left">
          Admin Panel
        </h2>
        <nav className="flex flex-row md:flex-col gap-1 overflow-x-auto md:overflow-x-visible no-scrollbar pb-3 md:pb-0">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                className={`text-left px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all flex-1 md:flex-none ${
                  isActive 
                    ? "bg-zinc-800 text-[#FF3D5A]" 
                    : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Body */}
      <main className="flex-1 px-4 sm:px-6 md:px-10 py-6 md:py-10 md:ml-64 w-full max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Manage Products</h1>
            <p className="text-zinc-500 text-xs sm:text-sm mt-1">Add, modify, or deprecate system entries.</p>
          </div>
          <button
            onClick={openAdd}
            className="w-full sm:w-fit px-5 py-3 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-[#FF3D5A] text-white hover:bg-[#e0002a] active:scale-[0.99] transition shadow-lg shadow-[#FF3D5A]/10 text-center"
          >
            + Add New Product
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center min-h-[200px]">
            <p className="text-zinc-500 text-sm animate-pulse">Loading catalog inventory...</p>
          </div>
        ) : products.length === 0 ? (
          <p className="text-zinc-500 text-sm py-8">No matching records found.</p>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden lg:block rounded-2xl border border-zinc-800 overflow-hidden bg-zinc-950">
              <table className="w-full text-sm">
                <thead className="bg-zinc-900 text-zinc-400 uppercase text-[10px] tracking-widest font-semibold">
                  <tr>
                    <th className="px-6 py-4 text-left">Display</th>
                    <th className="px-6 py-4 text-left">Name</th>
                    <th className="px-6 py-4 text-left">Category</th>
                    <th className="px-6 py-4 text-left">Price</th>
                    <th className="px-6 py-4 text-left">Stock Pool</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-900">
                  {products.map((product) => (
                    <tr key={product._id} className="hover:bg-zinc-900/40 transition duration-150">
                      <td className="px-6 py-4">
                        <img
                          src={product.image || "https://placehold.co/100"}
                          alt=""
                          className="w-11 h-11 object-cover rounded-lg bg-zinc-800 border border-zinc-700"
                        />
                      </td>
                      <td className="px-6 py-4 text-zinc-100 font-medium max-w-xs truncate">{product.name}</td>
                      <td className="px-6 py-4 text-zinc-400 text-xs">
                        <span className="bg-zinc-900 px-2.5 py-1 rounded-md border border-zinc-800">{product.category}</span>
                      </td>
                      <td className="px-6 py-4 text-zinc-100 font-semibold">₹{Number(product.price).toLocaleString("en-IN")}</td>
                      <td className="px-6 py-4">
                        <span className={`text-xs font-medium ${product.stock > 0 ? "text-zinc-400" : "text-red-400"}`}>
                          {product.stock} units
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => openEdit(product)}
                            className="px-3 py-1 rounded-lg border border-zinc-800 text-xs font-medium text-zinc-300 hover:border-[#FF3D5A] hover:text-[#FF3D5A] bg-zinc-900/50 transition"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(product._id)}
                            className="px-3 py-1 rounded-lg border border-zinc-800 text-xs font-medium text-zinc-400 hover:border-red-500 hover:text-red-500 bg-zinc-900/50 transition"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden">
              {products.map((product) => (
                <div key={product._id} className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-4 flex flex-col justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <img
                      src={product.image || "https://placehold.co/100"}
                      alt=""
                      className="w-16 h-16 object-cover rounded-xl bg-zinc-800 border border-zinc-700 flex-shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] uppercase font-semibold text-[#FF3D5A] bg-[#FF3D5A]/10 px-2 py-0.5 rounded-md">
                        {product.category || "General"}
                      </span>
                      <h3 className="text-sm font-bold text-white mt-2 truncate">{product.name}</h3>
                      <div className="flex justify-between items-center mt-1">
                        <p className="text-sm font-extrabold text-zinc-200">₹{Number(product.price).toLocaleString("en-IN")}</p>
                        <p className="text-xs text-zinc-500">Stock: <span className="text-zinc-300">{product.stock}</span></p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 w-full pt-2 border-t border-zinc-800/60">
                    <button
                      onClick={() => openEdit(product)}
                      className="flex-1 text-center py-2 rounded-xl border border-zinc-800 bg-zinc-900 text-xs font-semibold text-zinc-300 active:scale-[0.98] transition"
                    >
                      Modify Entry
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="flex-1 text-center py-2 rounded-xl border border-zinc-800/40 bg-zinc-950 text-xs font-semibold text-red-400 active:scale-[0.98] transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>

      {/* Entry Modal Panel */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-y-auto backdrop-blur-sm">
          <div className="bg-zinc-900 rounded-2xl p-5 sm:p-8 w-full max-w-xl border border-zinc-800 my-auto shadow-2xl max-h-[90vh] overflow-y-auto no-scrollbar">
            <h2 className="text-lg sm:text-xl font-bold mb-5 tracking-tight text-white border-b border-zinc-800 pb-3">
              {editingProduct ? "Modify Product Schema" : "Register Product Record"}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Product Title", name: "name" },
                { label: "Price (INR)", name: "price", type: "number" },
                { label: "Category Group", name: "category" },
                { label: "Available Stock", name: "stock", type: "number" },
                { label: "Display Image URL", name: "image", span: true },
                { label: "Product Description", name: "description", span: true, isTextArea: true },
                { label: "Base Rating Score", name: "rating", type: "number" },
              ].map(({ label, name, type = "text", span, isTextArea }) => (
                <div key={name} className={`flex flex-col gap-1.5 ${span ? "sm:col-span-2" : ""}`}>
                  <label className="text-[10px] text-zinc-400 uppercase font-semibold tracking-wider">
                    {label}
                  </label>
                  {isTextArea ? (
                    <textarea
                      name={name}
                      value={form[name]}
                      onChange={handleChange}
                      rows={3}
                      className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-zinc-100 outline-none focus:border-[#FF3D5A] transition text-xs sm:text-sm resize-none"
                    />
                  ) : (
                    <input
                      type={type}
                      name={name}
                      value={form[name]}
                      onChange={handleChange}
                      className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-zinc-100 outline-none focus:border-[#FF3D5A] transition text-xs sm:text-sm w-full"
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-6 sm:mt-8 pt-4 border-t border-zinc-800">
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="order-1 sm:order-2 flex-1 py-3 sm:py-2.5 rounded-xl bg-[#FF3D5A] text-white text-xs sm:text-sm font-semibold hover:bg-[#e0002a] active:scale-[0.99] transition disabled:opacity-40 text-center"
              >
                {submitting ? "Processing..." : editingProduct ? "Save Updates" : "Commit Record"}
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="order-2 sm:order-1 flex-1 py-3 sm:py-2.5 rounded-xl border border-zinc-800 bg-zinc-950 text-xs font-semibold text-zinc-400 hover:text-white transition text-center"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}