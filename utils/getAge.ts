export function getAge() {
  const birthDate = new Date(1997, 3, 16);
  const currentDate = new Date();
  const yearsSinceBirth =
    currentDate.getFullYear() - birthDate.getFullYear();
  const month = currentDate.getMonth() - birthDate.getMonth();
  if (
    month < 0 ||
    (month === 0 && currentDate.getDate() < birthDate.getDate())
  ) {
    return yearsSinceBirth - 1;
  }
  return yearsSinceBirth;
}
