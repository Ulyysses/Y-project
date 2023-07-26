export const countPrice = (cartItems) => {
  return cartItems.reduce(
    (acc, current) =>
      (acc += current.type === "bun" ? current.price * 2 : current.price),
    0
  );
};

export const formateDate = (date) => {
  const setDay = (date) => {
    const today = new Date();
    date.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    const dayDiff = (today - date) / (24 * 60 * 60 * 1000);

    if (dayDiff === 0) {
      return "Сегодня";
    } else if (dayDiff === 1) {
      return "Вчера";
    } else if (dayDiff > 1 && dayDiff < 5) {
      return dayDiff + " дня назад";
    } else {
      return dayDiff + " дней назад";
    }
  };

  const newDate = new Date(date);
  const formattedeDate = newDate.toLocaleString("ru", {
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });
  return `${setDay(newDate)}, ${formattedeDate}`;
};
