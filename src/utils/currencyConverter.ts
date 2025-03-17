export type CurrencyCode = "USD" | "EUR" | "GBP";

export class CurrencyConverter {
    private static readonly exchangeRates: Record<CurrencyCode, number> = {
        USD: 1,     // Base currency
        EUR: 1.08,  // 1 EUR = 1.08 USD
        GBP: 1.27,  // 1 GBP = 1.27 USD
    };

    // ✅ Convert from USD to another currency
    static convertFromUsd(amount: number, to: CurrencyCode): number {
        if (to === "USD") return parseFloat(amount.toFixed(2));
        return parseFloat((amount / this.exchangeRates[to]).toFixed(2));
    }

    // ✅ Convert from another currency to USD
    static convertToUsd(amount: number, from: CurrencyCode): number {
        if (from === "USD") return parseFloat(amount.toFixed(2));
        return parseFloat((amount * this.exchangeRates[from]).toFixed(2));
    }

    // ✅ Convert between any two currencies
    static convertCurrency(amount: number, from: CurrencyCode, to: CurrencyCode): number {
        if (from === to) return parseFloat(amount.toFixed(2));
        
        const amountInUsd = this.convertToUsd(amount, from);
        return this.convertFromUsd(amountInUsd, to);
    }
}
