const container = document.getElementById("sorting-frame");
const start_button = document.getElementById("start-btn");
const reset_button = document.getElementById("reset-btn");

function random_height(min, max) {
  let random_num = Math.random();
  return Math.floor(random_num * (max - min) + min);
}

start_button.addEventListener("click", () => {
  for (let i = 0; i < 60; ++i) {
    let one_bar = document.createElement("div");
    one_bar.setAttribute("id", `${i}`);
    one_bar.setAttribute("class", "array-bar");
    one_bar.style.height = `${random_height(5, 450)}px`;
    container.append(one_bar);
  }

  start_button.disabled = true;
});

reset_button.addEventListener("click", () => {
  for (let i = 0; i < 60; ++i)
  {
    let element = document.getElementById(`${i}`);
    element.remove();
  }
  start_button.disabled = false;
})
