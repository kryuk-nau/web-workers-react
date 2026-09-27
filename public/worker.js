// Функція для обчислення числа Фібоначчі.
function getFibonacci(n) {
  if (n <= 1) return n;
  let a = 0, b = 1;
  for (let i = 2; i <= n; i++) {
    let temp = a + b;
    a = b;
    b = temp;
  }
  return b;
}

self.onmessage = function (e) {
  // Отримуємо дані у форматі { data: someValue }
  const value = e.data.data;
  const result = getFibonacci(Number(value));
  
  // Повертаємо число[cite: 5]
  self.postMessage(result);
};
