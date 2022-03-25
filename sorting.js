const container = document.getElementById("sorting-frame");
const start_button = document.getElementById("start-btn");
const reset_button = document.getElementById("reset-btn");

let to_sort = [];
array_size = 60;

for (let i = 0; i < array_size; ++i) {
  to_sort.push(random_height(15, 450));
}

quicksort(to_sort, 0, array_size - 1);
console.log(to_sort);


// console.log(to_sort);
// swap_one_range(to_sort, 0, array_size - 1);

// let sort = [35, 97, 99, 48, 12, 27, 103, 14, 32];
// console.log(sort);
// swap_one_range(sort, 0, 8);

start_button.addEventListener("click", () => {
  draw_frame(to_sort);
  start_button.disabled = true;
});

reset_button.addEventListener("click", () => {
  let bars = document.getElementsByClassName("array-bar");
  clear_frame(bars);
  start_button.disabled = false;
});

function quicksort(to_sort, min, max) {
  if (min >= max)
    return;
  
  let pivot = swap_one_range(to_sort, min, max);

  quicksort(to_sort, min, pivot - 1);
  quicksort(to_sort, pivot + 1, max);
}

function swap_one_range(to_sort, min, max) {
  pivot = min;
  left = min + 1;
  right = max;

  do {
    while (to_sort[right] >= to_sort[pivot] && right != left) --right;
    while (to_sort[left] <= to_sort[pivot] && left != right) ++left;

    // console.log(`left: ${left}, right: ${right}`);

    if (left != right) {
      let a = to_sort[left];
      to_sort[left] = to_sort[right];
      to_sort[right] = a;
    }
  }
  while(left != right)

  if (to_sort[pivot] > to_sort[right]) {
    let a = to_sort[pivot];
    to_sort[pivot] = to_sort[right];
    to_sort[right] = a;

    return right;
  }
  else
    return pivot;

}

function draw_frame(to_sort) {
  to_sort.forEach((element) => {
    let one_bar = document.createElement("div");
    one_bar.setAttribute("class", "array-bar");
    one_bar.style.height = `${element}px`;
    container.append(one_bar);
  });
}

//Clear the sorting "frame" (container) of the bars.
function clear_frame(bars) {
  Array.from(bars).forEach((element) => element.remove());
}

//Returns a random height [min, max)
function random_height(min, max) {
  let random_num = Math.random();
  return Math.floor(random_num * (max - min) + min);
}
