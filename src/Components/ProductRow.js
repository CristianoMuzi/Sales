
import { useEffect, useMemo, useState } from "react";

export default function ProductRow({ products, onAdd }) {
    const [productId, setProductId] = useState(products[0]?.id ?? "");
    const [quantity, setQuantity] = useState(1);
    const [imported, setImported] = useState(false);


    // Per il primo elemento già selezionato
    useEffect(() => {
        if (!products?.length) {
            setProductId("");
            return;
        }

        const exist = products.some(p => p.id === productId);
        if (!exist) {
            setProductId(products[0].id);
        }
    }, [products, productId]);


    const selected = useMemo(
        () => products.find(p => p.id === productId),
        [products, productId]
    );

    function handleAdd() {
        if (!selected) return;

        const q = Number(quantity);
        if (!Number.isFinite(q) || q <= 0) return;

        onAdd({
            productId: selected.id,
            name: selected.name,
            category: selected.category,
            price: selected.price,
            quantity: q,
            imported
        });
    }

    return (
        <div className="formRow">
            <label>
                Article
                <select
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                >
                    {products.map(p => (
                        <option key={p.id} value={p.id}>
                            {p.name} — €{p.price.toFixed(2)} ({p.category})
                        </option>
                    ))}
                </select>
            </label>

            <label>
                Qta
                <input
                    type="number"
                    min="1"
                    step="1"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />
            </label>

            {/* <div> */}
            <label>
                Import
                {/* <div className="muted" style={{ fontSize: 12, marginBottom: 6 }}>Import</div> */}
                <div className="checkbox">
                    <input
                        type="checkbox"
                        checked={imported}
                        onChange={(e) => setImported(e.target.checked)}
                    />
                    <span>Imported</span>
                </div>
            </label>

            {/* </div> */}

            <button className="btn" onClick={handleAdd} disabled={!selected}>
                Add
            </button>
        </div>
    );
}
