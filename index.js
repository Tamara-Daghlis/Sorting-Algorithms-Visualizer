const randomize = document.getElementById("randomize-btn");
const solve = document.getElementById("solve-bnt");
const range = document.getElementById("array-length");
const arrayLength = document.getElementById("output");
const container = document.getElementById("array-container");

let length;
let generatedArray = [];

range.oninput = function () {
  length = range.value;
  arrayLength.innerHTML = range.value;
};

randomize.addEventListener("click", () => {
  if (length) {
    generatedArray = generateRandomArray(length);
    appendArray(generatedArray);
  } else {
    appendArray(initialArray);
  }
});

solve.addEventListener("click", async () => {
  if (length) {
    await bubbleSort(generatedArray);
  } else {
    await bubbleSort(initialArray);
  }
});

function generateRandomArray(length) {
  let randomArray = [];
  for (let i = 0; i < length; i++) {
    randomArray.push(Math.floor(Math.random() * 100) + 1);
  }
  return randomArray;
}

function appendArray(generatedArray) {
  container.innerHTML = "";
  generatedArray.map((element, index) => {
    container.innerHTML += `
        <div class="array-item" id=${index}>${element}</div>
         `;
    document.getElementById(`${index}`).style.height = `${
      element * 2.8 + 20
    }px`;
  });
}

async function bubbleSort(arr) {
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr.length - i - 1; j++) {
      changeColor(j);
      changeColor(j + 1);
      await sleep(200);

      if (arr[j] > arr[j + 1]) {
        await sleep(100);
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;

        swapElements(j, j + 1);
        await sleep(100);

        changeColorBack(j);
        changeColorBack(j + 1);
      } else {
        changeColorBack(j);
        changeColorBack(j + 1);
      }
    }
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function swapElements(element1Id, element2Id) {
  const element1 = document.getElementById(`${element1Id}`);
  const element2 = document.getElementById(`${element2Id}`);

  let tempValue = element1.innerText;
  let tempHeight = element1.style.height;

  element1.innerText = element2.innerText;
  element1.style.height = element2.style.height;

  element2.innerText = tempValue;
  element2.style.height = tempHeight;
}

function changeColor(id) {
  const selectedItem = document.getElementById(`${id}`);
  selectedItem.style.background = "#D8BFD8";
}

function changeColorBack(id) {
  const selectedItem = document.getElementById(`${id}`);
  selectedItem.style.background = "#9695ca";
}

let initialArray = generateRandomArray(10);
appendArray(initialArray);
