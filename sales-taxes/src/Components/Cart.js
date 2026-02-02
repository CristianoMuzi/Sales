
export default function Cart({ items, onRemove, onClear }) {
    return (
        <div className="card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                <h2 style={{ margin: 0 }}>Cart</h2>
                <button className="btn btnGhost" onClick={onClear} disabled={items.length === 0}>
                    Empty
                </button>
            </div>

            {items.length === 0 ? (
                <p className="muted" style={{ marginTop: 10 }}>No items.</p>
            ) : (
                <table className="table" style={{ marginTop: 12 }}>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Category</th>
                            <th>Imported</th>
                            <th>Qta</th>
                            <th>Price</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((it, idx) => (
                            <tr key={idx}>
                                <td style={{ fontWeight: 650 }}>{it.name}</td>
                                <td className="muted">{it.category}</td>
                                <td>{it.imported ? "Yes" : "No"}</td>
                                <td>{it.quantity}</td>
                                <td className="money">€{it.price.toFixed(2)}</td>
                                <td>
                                    <button className="btn btnDanger" onClick={() => onRemove(idx)}>
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

        </div>
    );
}