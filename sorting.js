//Global section
const container = document.getElementById("sorting-frame");
const start_button = document.getElementById("start-btn");
const reset_button = document.getElementById("reset-btn");
const main_bar_color = "#A0BAA3";
const pivot_color = "#395646";
const range_color = "#73B0FF";


//Main 
let to_sort = [];
array_size = 60;

randomize_array();
draw_frame();

let bars = document.querySelectorAll(".array-bar");


//Event Listeners
start_button.addEventListener("click", () => {
  start();
});

reset_button.addEventListener("click", () => {
  reset();
});



//Functions
async function start() {
  start_button.disabled = true;
  reset_button.disabled = true;
  await quicksort(to_sort, 0, array_size - 1);
  reset_button.disabled = false;

}

function reset() {
  clear_frame();
  randomize_array();
  draw_frame();
  bars = document.querySelectorAll(".array-bar");
  start_button.disabled = false;
}


function swap_two(index1, index2) {
  //Swap in the integer array
  let a = to_sort[index1];
  to_sort[index1] = to_sort[index2];
  to_sort[index2] = a;

  //Swap heights in the bars array
  bars[index1].style.height = `${to_sort[index1]}px`;
  bars[index2].style.height = `${to_sort[index2]}px`;
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

  let pivot = await partition(to_sort, min, max);

  await quicksort(to_sort, min, pivot - 1);
  await quicksort(to_sort, pivot + 1, max);
}

async function partition(to_sort, min, max) {
  pivot = min;
  left = min + 1;
  right = max;

  bars[pivot].style.backgroundColor = pivot_color;
  bars[left].style.backgroundColor = range_color;
  bars[right].style.backgroundColor = range_color;

  do {
    while (to_sort[right] >= to_sort[pivot] && right != left) --right;
    while (to_sort[left] <= to_sort[pivot] && left != right) ++left;

    await sleep(100);

    if (left != right) {
      swap_two(left, right);
    }
  } while (left != right);

  await sleep(100);

  if (to_sort[pivot] > to_sort[right]) {
    swap_two(pivot, right);
    bars[min + 1].style.backgroundColor = main_bar_color;
    bars[max].style.backgroundColor = main_bar_color;

    return right;
  } else {
    bars[min + 1].style.backgroundColor = main_bar_color;
    bars[max].style.backgroundColor = main_bar_color;

    return pivot;
  }
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
function clear_frame() {
  Array.from(bars).forEach((element) => element.remove());
}

//Returns a random height [min, max)
function random_height(min, max) {
  let random_num = Math.random();
  return Math.floor(random_num * (max - min) + min);
}
