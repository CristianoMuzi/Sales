
import { useEffect, useState } from "react";
import ProductRow from "./Components/ProductRow";
import Cart from "./Components/Cart";
import Receipt from "./Components/Receipt";
import productsData from "./Data/Products.json";
export default function App() {

  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const [receipt, setReceipt] = useState(null);
  const [loadingReceipt, setLoadingReceipt] = useState(false);

  useEffect(() => {
    async function loadProducts() {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/products`);

      const data = await res.json();
      setProducts(data.items);
    }

    loadProducts();
  }, []);


  function addItem(item) {
    setCartItems(prev => [...prev, item]);
  }


  function removeItem(index) {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  }

  function removeRecipet() {
    setReceipt([{}]);
  }

  function clearCart() {
    setCartItems([]);
  }

  async function generateReceipt() {
    setLoadingReceipt(true);

    try {
      const payload = {
        currency: "EUR",
        items: cartItems.map(i => ({
          productId: i.productId,
          quantity: i.quantity,
          imported: i.imported
        }))
      };

      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/receipts/calcolaRicevuta`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt);
      }

      const data = await res.json();
      setReceipt(data);
    } catch (err) {
      console.error("generateReceipt failed:", err);
      alert("Errore nel calcolo della ricevuta");
    } finally {
      setLoadingReceipt(false);
    }
  }
  return (
    <div className="container">
      <div className="header">
        <div>
          <h1>Sales Taxes</h1>
          <p>Select an article, quantity and “imported”.</p>
        </div>
        <div className="badge">Cart rows: {cartItems.length}</div>
      </div>

      <div className="grid">
        <div className="card">
          <h2>Add article</h2>
          <ProductRow products={products} onAdd={addItem} />
        </div>

        <Cart items={cartItems} onRemove={removeItem} onClear={clearCart} />
        <button
          className="btn"
          onClick={generateReceipt}
          disabled={cartItems.length === 0 || loadingReceipt}
        >
          {loadingReceipt ? "Calcolo..." : "Generate recipet"}
        </button>
        <div className="card">
          <Receipt receipt={receipt} removeRecipet={removeRecipet} />
        </div>
      </div>

    </div>
  );

}
