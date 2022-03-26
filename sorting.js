const container = document.getElementById("sorting-frame");
const start_button = document.getElementById("start-btn");
const reset_button = document.getElementById("reset-btn");

let to_sort = [];
array_size = 60;

randomize_array();


start_button.addEventListener("click", () => {
  start_button.disabled = true;
  reset_button.disabled = true;
  draw_frame(to_sort);
  quicksort(to_sort, 0, array_size - 1);
  console.log(to_sort);
  start_button.disabled = false;
  reset_button.disabled = false;
});

reset_button.addEventListener("click", () => {
  let bars = document.getElementsByClassName("array-bar");
  clear_frame(bars);
  start_button.disabled = false;
});

function randomize_array() {
  //Clear array
  to_sort = []; 

  for (let i = 0; i < array_size; ++i) {
   to_sort.push(random_height(15, 450));
}

}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
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

    // console.log(`left: ${left}, right: ${right}`);

    if (left != right) {
      let a = to_sort[left];
      to_sort[left] = to_sort[right];
      to_sort[right] = a;
      let bars = document.getElementsByClassName("array-bar");
      clear_frame(bars);

      draw_frame(to_sort);
    }
  } while (left != right);

  if (to_sort[pivot] > to_sort[right]) {
    let a = to_sort[pivot];
    to_sort[pivot] = to_sort[right];
    to_sort[right] = a;

    let bars = document.getElementsByClassName("array-bar");
    clear_frame(bars);

    draw_frame(to_sort);

    return right;
  } else return pivot;
}

// function swap(to_sort, element_one, element_two) {}

function draw_frame(to_sort) {
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
