export function getPriceValue(entity) {
  if (!entity) return 0;

  const possibleValues = [
    entity.basePrice,
    entity.pricePerNight,
    entity.price,
    entity.pricing?.basePricePerNight,
    entity.priceRange?.min,
    entity.price?.roomPrice,
    entity.price?.totalAmount,
  ];

  const value = possibleValues.find((item) => Number(item) > 0);
  return Number(value || 0);
}

export function formatPrice(amount, options = {}) {
  const {
    currency = "INR",
    locale = "en-IN",
    fallback = "Price on request",
  } = options;

  const numericAmount = Number(amount || 0);
  if (!numericAmount) return fallback;

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(numericAmount);
}

export function formatPriceLabel(entity, options = {}) {
  return formatPrice(getPriceValue(entity), options);
}
