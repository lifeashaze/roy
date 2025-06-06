// Currency configuration
const CURRENCY_CONFIG = {
  symbol: '₹', 
  position: 'before', 
  locale: 'en-IN', 
  currency: 'INR',
}

export function formatCurrency(price: number | undefined | null): string {
  if (typeof price !== 'number' || isNaN(price)) {
    return CURRENCY_CONFIG.position === 'before' 
      ? `${CURRENCY_CONFIG.symbol}0.00`
      : `0.00${CURRENCY_CONFIG.symbol}`
  }

  const formattedAmount = price.toFixed(2)
  
  return CURRENCY_CONFIG.position === 'before'
    ? `${CURRENCY_CONFIG.symbol}${formattedAmount}`
    : `${formattedAmount}${CURRENCY_CONFIG.symbol}`
}

// Alternative using Intl.NumberFormat for proper locale-based formatting
export function formatCurrencyIntl(price: number | undefined | null): string {
  if (typeof price !== 'number' || isNaN(price)) {
    return new Intl.NumberFormat(CURRENCY_CONFIG.locale, {
      style: 'currency',
      currency: CURRENCY_CONFIG.currency,
    }).format(0)
  }

  return new Intl.NumberFormat(CURRENCY_CONFIG.locale, {
    style: 'currency',
    currency: CURRENCY_CONFIG.currency,
  }).format(price)
} 