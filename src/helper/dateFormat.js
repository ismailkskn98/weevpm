export const dateFormat = (date, locale) => {
  const dateObj = new Date(date);

  const formattedDate = new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
    // hour: "2-digit",
    // minute: "2-digit",
  }).format(dateObj);
  return formattedDate;
};
