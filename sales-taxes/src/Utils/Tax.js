
const BASIC_TAX_RATE = 0.10;
const IMPORT_DUTY_RATE = 0.05;

const EXEMPT_CATEGORIES = new Set(["books", "food", "medical"]);

export function roundUpToFiveCents(value) {
    return Math.ceil(value * 20) / 20;
}

export function calculateTaxes({ category, price, imported }) {
    let taxRate = 0;

    if (!EXEMPT_CATEGORIES.has(category)) {
        taxRate += BASIC_TAX_RATE;
    }
    if (imported) {
        taxRate += IMPORT_DUTY_RATE;
    }

    return roundUpToFiveCents(price * taxRate);
}
