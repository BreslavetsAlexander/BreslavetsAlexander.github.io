const addButton = document.querySelector('#add-button');
const addInput = document.querySelector('#add-input');
const toDoItemsArr = document.querySelectorAll('.todo-item');

for (let i = 0; i < toDoItemsArr.length; i++) {
    checkItem(toDoItemsArr[i]);
    editItem(toDoItemsArr[i]);
    deleteItem(toDoItemsArr[i]);
}

addButton.addEventListener('click', createItem);

function createItem() {
    if (addInput.value !== '') {
        const toDoItem = document.createElement('li');
        toDoItem.classList.add('todo-item');
        toDoItem.innerHTML = `
                    <input class="checkbox" type="checkbox">
                    <label class="title">${addInput.value}</label>
                    <input class="textfield" type="text">
                    <button class="edit">Изменить</button>
                    <button class="delete">Удалить</button>`;
        document.querySelector('#todo-list').appendChild(toDoItem);
        checkItem(toDoItem);
        editItem(toDoItem)
        deleteItem(toDoItem);
        addInput.value = '';
    }
}

function checkItem(item) {
    item.querySelector('.checkbox').addEventListener('change', () => {
        item.classList.toggle('completed');
    });
}

function editItem(item) {
    item.querySelector('.edit').addEventListener('click', () => {
        if (item.querySelector('.edit').innerHTML === 'Изменить') {
            item.classList.add('editing');
            item.querySelector('.edit').innerHTML = 'Сохранить';
            item.querySelector('.textfield').value = item.querySelector('.title').innerHTML;
        } else if (item.querySelector('.edit').innerHTML === 'Сохранить' && item.querySelector('.textfield').value !== '') {
            item.classList.remove('editing');
            item.querySelector('.edit').innerHTML = 'Изменить';
            item.querySelector('.title').innerHTML = item.querySelector('.textfield').value;
        }
    });
}

function deleteItem(item) {
    item.querySelector('.delete').addEventListener('click', () => {
        item.remove();
    });
}