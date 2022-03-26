const container = document.getElementById("sorting-frame");
const start_button = document.getElementById("start-btn");
const reset_button = document.getElementById("reset-btn");

let to_sort = [];
array_size = 60;

randomize_array();
draw_frame();

// let bars = document.getElementsByClassName("array-bar");
let bars2 = document.querySelectorAll(".array-bar");
console.log(bars2);

start_button.addEventListener("click", () => {
  start_button.disabled = true;
  reset_button.disabled = true;
  quicksort(to_sort, 0, array_size - 1);
  console.log(to_sort);
  start_button.disabled = false;
  reset_button.disabled = false;
});

reset_button.addEventListener("click", () => {
  clear_frame(bars);
  start_button.disabled = false;
});

function swap_two(index1, index2) {
  //Swap in the integer array
  let a = to_sort[index1];
  to_sort[index1] = to_sort[index2];
  to_sort[index2] = a;

  console.log(`index ${index1}: ${to_sort[index1]}, index ${index2}: ${to_sort[index2]}`);

  //Swap heights in the bars array
  bars2[index1].style.height = `${to_sort[index1]}px`;
  bars2[index2].style.height = `${to_sort[index2]}px`;
}

function randomize_array() {
  //Clear array
  to_sort = [];

  for (let i = 0; i < array_size; ++i) {
    to_sort.push(random_height(15, 450));
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function quicksort(to_sort, min, max) {
  if (min >= max) return;

  let pivot = await swap_one_range(to_sort, min, max);

  await quicksort(to_sort, min, pivot - 1);
  await quicksort(to_sort, pivot + 1, max);
}

async function swap_one_range(to_sort, min, max) {
  pivot = min;
  left = min + 1;
  right = max;

  await sleep(250);

  do {
    while (to_sort[right] >= to_sort[pivot] && right != left) --right;
    while (to_sort[left] <= to_sort[pivot] && left != right) ++left;


    if (left != right) {
      // let a = to_sort[left];
      // to_sort[left] = to_sort[right];
      // to_sort[right] = a;
      // let bars = document.getElementsByClassName("array-bar");
      // clear_frame(bars);

      // draw_frame();
      swap_two(left, right);
    }
  } while (left != right);

  if (to_sort[pivot] > to_sort[right]) {
    // let a = to_sort[pivot];
    // to_sort[pivot] = to_sort[right];
    // to_sort[right] = a;

    // let bars = document.getElementsByClassName("array-bar");
    // clear_frame(bars);

    // draw_frame();
    swap_two(pivot, right);

    return right;
  } else return pivot;
}

function draw_frame() {
  let i = 0;
  to_sort.forEach((element) => {
    let one_bar = document.createElement("div");
    one_bar.setAttribute("class", "array-bar");
    one_bar.setAttribute("id", `"${element}"`);
    one_bar.style.height = `${element}px`;
    container.append(one_bar);
    ++i;
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
