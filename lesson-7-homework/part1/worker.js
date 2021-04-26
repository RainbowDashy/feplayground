function fibSlow(n) {
  if (n <= 2) return 1;
  return fibSlow(n - 1) + fibSlow(n - 2);
}

onmessage = function (e) {
  const n = e.data;
  postMessage(fibSlow(n));
};
