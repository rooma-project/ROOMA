const priceFormatter = new Intl.NumberFormat("tr-TR", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

/** Format a Turkish lira amount for display, not for numeric form inputs. */
export function formatPrice(amount: number): string {
  return `₺${priceFormatter.format(amount)}`;
}
