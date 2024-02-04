let titleInput = document.getElementById("my-text");
let descriptionInput = document.getElementById("my-desc");
let todoElement = document.getElementById("todo");

let itemsArray = localStorage.getItem("items")
  ? JSON.parse(localStorage.getItem("items"))
  : [];

let editItem = null;

itemsArray.forEach(addItem);
function addItem(item) {
  todoElement.innerHTML = `
  <div class="task">
  <ul id="box">
  <li>
  ${item.title}
  <p>
  ${item.description}
  </p>
  </li>
  <button onclick="remove('${item.id}')">remove</button>
  <button onclick="edit('${item.id}')">edit</button>
  </ul>
  </div>
  ` + todoElement.innerHTML;
}

function add() {
  let item = {
    id: crypto.randomUUID(),
    title: titleInput.value,
    description: descriptionInput.value
  };

  titleInput.value = '';
  descriptionInput.value = '';

  if (editItem != null) {
    let index = itemsArray.indexOf(editItem);

    if (index > -1) {
      itemsArray.splice(index, 1);
    }

    editItem = null;
  }

  itemsArray.push(item);

  localStorage.setItem('items', JSON.stringify(itemsArray));

  todoElement.innerHTML = '';

  itemsArray.forEach(addItem);
}

function remove(id) {
  let item = itemsArray.find((element) => element.id == id);

  let index = itemsArray.indexOf(item);

  if (index > -1) {
    itemsArray.splice(index, 1);
    
    localStorage.setItem('items', JSON.stringify(itemsArray));
    
    todoElement.innerHTML = '';
    
    itemsArray.forEach(addItem);
  }
}

function edit(id) {
  let item = itemsArray.find((element) => element.id == id);

  editItem = item;

  titleInput.value = item.title;
  descriptionInput.value = item.description;
}
