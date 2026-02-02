export default function Receipt({ receipt, removeRecipet }) {
    if (!receipt || !receipt.lines || receipt.lines.length == 0) {
        return <p className="muted">Click “Generate recipt” to see the total.</p>;
    }

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                <h2>Receipt</h2>
                <h2 style={{ margin: 0 }}></h2>
                <button className="btn btnGhost" onClick={removeRecipet} >
                    Empty
                </button>
            </div>
            {receipt.lines.map((line, idx) => (
                <div key={idx} className="rowItem">
                    <div>
                        <strong>
                            {line.quantity} {line.displayName}
                        </strong>
                        <div className="muted" style={{ fontSize: 12 }}>
                            tax/item €{line.taxPerUnit.toFixed(2)}
                        </div>
                    </div>
                    <div className="money">
                        €{line.lineTotal.toFixed(2)}
                    </div>
                </div>
            ))}

            <div className="hr" />

            <div className="kpi">
                <span className="muted">Sales Taxes</span>
                <span className="money">€{receipt.salesTaxes.toFixed(2)}</span>
            </div>

            <div className="kpi" style={{ fontSize: 16 }}>
                <span>Total</span>
                <span className="money">€{receipt.total.toFixed(2)}</span>
            </div>
        </div>
    );
}
