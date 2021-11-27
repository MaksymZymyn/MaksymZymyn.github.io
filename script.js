// const state = {
//     items: [{
//             id: "todoone",
//             text: "text-todo-1",
//             isDone: false,
//         },

//         {
//             id: "todotwo",
//             text: "text-todo-2",
//             isDone: false,
//         },

//         {
//             id: "todothree",
//             text: "text-todo-3",
//             isDone: true,
//         },
//     ],
// };

// Объекты веб-хранилища в браузере.
// setItem(key, value) – сохранить пару ключ/значение.
// getItem(key) – получить данные по ключу key.
const initialItemsString = localStorage.getItem("toDoList");

// JavaScript предоставляет методы:
// JSON.stringify для преобразования объектов в JSON.
// JSON.parse для преобразования JSON обратно в объект.
const initialItemsState = JSON.parse(initialItemsString);

const state = {
    items: initialItemsState || [],
};

const createToDoItem = (item) => {
    const newItem = document.createElement("li");
    newItem.className = "todo-item";
    newItem.innerHTML = `
    <label class='ch-box-wrapper'>
        <input type="checkbox" class='ch-box' 
        ${item.isDone ? "checked":""} 
        itemId="${item.id}"
        onchange="onChangeCheckbox(this)">
        </checkbox>
        <span class='custom-ch-box'></span>
    </label>
    <span class="todo-text  ${item.isDone ? "todo-text__line-through" : ""}">
    ${item.text}
    </span>
    <button class="todo-remove-btn" itemId="${item.id}" onclick="onDeleteClick(this)">
    <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="0.830777" y1="9.96212" x2="9.46211" y2="1.33078" stroke="black" stroke-opacity="0.5"/>
      <line x1="9.27778" y1="9.98489" x2="0.646446" y2="1.35355" stroke="black" stroke-opacity="0.5"/>
    </svg>    
    </button>
    `
    return newItem;
}

const rerenderApp = () => {
    const toDoList = document.getElementById("toDoList");
    const doneList = document.getElementById("doneList");

    // console.log(toDoList, doneList);

    toDoList.innerHTML = "";
    doneList.innerHTML = "";

    state.items.forEach((item) => {
        const newItemElement = createToDoItem(item);

        if (item.isDone) {
            doneList.appendChild(newItemElement);
        } else {
            toDoList.appendChild(newItemElement);
        }
    });

    localStorage.setItem("toDoList", JSON.stringify(state.items));
};

// appendChild - вовнутрь в конец

rerenderApp();



const addItemForm = document.getElementById("addItemForm");

// console.log(addItemForm)

addItemForm.onsubmit = (event) => {
    event.preventDefault();

    const newTodoText = event.target.newToDo.value;
    // указывается имя инпута

    // console.log(newTodoText)

    state.items.push({
        id: uuid.v1(),
        text: newTodoText,
        isDone: false,
    });

    if (newTodoText == '') {
        newTodoText = false;
    } else {}

    event.target.newToDo.value = "";

    event.preventDefault();

    rerenderApp();

};

// push добавляет элемент в конец

const onChangeCheckbox = (target) => {
    const id = target.getAttribute("itemId");

    // console.log(id)

    state.items.forEach((item, index) => {
            if (item.id === id) {
                state.items[index].isDone = target.checked;
            }
        }

    )
    rerenderApp();
}



const onDeleteClick = (target) => {
    const id = target.getAttribute("itemId");

    state.items = state.items.filter((item) => {
        return item.id !== id
    });


    rerenderApp();
}



const clearAllBtn = document.getElementById("clearAll");

clearAllBtn.onclick = () => {
    state.items = [];
    rerenderApp();
}