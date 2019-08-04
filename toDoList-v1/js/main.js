const toDoItems = [];
const addInput = document.querySelector('#add-input');

class ToDoItem {
    constructor(title) {
        this.title = title;
        this.edit = false;
        this.done = false;
    }
    addItem() {
        toDoItems.push(this);
    }
    saveItem(newTitle) {
        this.title = newTitle ? newTitle : 'title';
        this.edit = false;
    }
    editItem() {
        this.edit = true;
    }
    doneItem() {
        this.done = !this.done;
    }
    removeItem() {
        toDoItems.splice(toDoItems.indexOf(this), 1);
    }
    renderItem() {
        return `
            <li class="todo-item ${this.done ? 'completed' : ''} ${this.edit ? 'editing' : ''}">
                <input ${this.done ? 'checked' : ''} class="checkbox" type="checkbox">
                <label class="title">${this.title}</label>
                <input class="textfield" type="text" value=${this.title}>
                <button class="edit" style="display: ${this.done ? 'none' : 'block'}">${this.edit ? 'Сохранить' : 'Изменить'}</button>
                <button class="delete" style="display: ${this.edit ? 'none' : 'block'}">Удалить</button>
            </li>`
    }
}

document.querySelector('#add-button').addEventListener('click', () => {
    if (addInput.value.trim().length) {
        new ToDoItem(addInput.value).addItem();
        renderList();
        addInput.value = '';
    }
});

function renderList() {
    document.querySelector('#todo-list').innerHTML = '';
    toDoItems.forEach(item => {
        document.querySelector('#todo-list').innerHTML += item.renderItem();
    });
    [...document.querySelector('#todo-list').children].forEach((item, i) => {
        item.querySelector('.delete').addEventListener('click', () => {
            toDoItems[i].removeItem();
            renderList();
        });
        item.querySelector('.edit').addEventListener('click', () => {
            if (toDoItems[i].edit) {
                toDoItems[i].saveItem(item.querySelector('.textfield').value);
            } else {
                toDoItems[i].editItem();
            }
            renderList();
        });
        item.querySelector('.checkbox').addEventListener('click', () => {
            toDoItems[i].doneItem();
            renderList();
        });
    });
}