const btn = document.querySelector("button");
const input = document.querySelector("input");

if (window.Worker) {
  const worker = new Worker("worker.js");
  btn.addEventListener("click", () => {
    const n = Number(input.value);
    print("Waiting...");
    const now = Date.now();
    worker.postMessage(n);
    worker.onmessage = function (e) {
      let res = e.data;
      const costInMs = Date.now() - now;
      print(`Result: ${res} in ${costInMs} ms`);
    };
  });
} else {
  print("Your browser doesn't support web workers.");
}

const log = document.querySelector(".log");
function print(str) {
  log.innerText = str;
}
