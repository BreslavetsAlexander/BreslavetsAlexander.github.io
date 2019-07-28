let toDoItems = [];

class ToDoItem {
    constructor(title) {
        this.title = title;
        this.done = false;
        this.checked = false;
    }
    addItem() {
        toDoItems.unshift(this);
    }
    doneItem() {
        this.done = true;
        this.checked = false;
    }
    restoreItem() {
        this.done = false;
        this.checked = false;
    }
    removeItem() {
        toDoItems.splice(toDoItems.indexOf(this), 1);
        this.checked = false;
    }
    checkItem() {
        this.checked = !this.checked;
    }
    renderItem() {
        return `
                <li class="item">
                    <input style="margin: 0;" ${this.checked ? 'checked' : ''} class="form-check-input" type="checkbox" id="item_${toDoItems.length}">
                    <label style="margin: -4.8px 0 0 15px" class="form-check-label ${this.done ? 'todoDone' : ''}" for="item_${toDoItems.length}">${this.title}</label>
                    <button type="button" style="float: right; display: ${!this.done ? 'block' : 'none'}" id="btn-done" class="btn btn-outline-success">Done</button>
                    <div style="float: right; display: ${this.done ? 'block' : 'none'}">
                        <button type="button" id="btn-remove" class="btn btn-outline-danger">Remove</button>
                        <button type="button" id="btn-restore" class="btn btn-outline-info">Restore</button>
                    </div>
                </li>`
    }
}

document.querySelector('#input').addEventListener('keydown', function (e) {
    if (this.value.trim().length && e.keyCode === 13) {
        new ToDoItem(this.value).addItem();
        renderList();
        this.value = '';
    }
});

function renderList() {
    let countCheckedItems = 0;
    document.querySelector('#list').innerHTML = '';
    toDoItems.forEach(item => {
        document.querySelector('#list').innerHTML += item.renderItem();
        if (item.checked) {
            countCheckedItems++;
        }
    });
    [...document.querySelector('#list').children].forEach((item, i) => {
        item.querySelector('#btn-done').addEventListener('click', () => {
            toDoItems[i].doneItem();
            renderList();
        });
        item.querySelector('#btn-restore').addEventListener('click', () => {
            toDoItems[i].restoreItem();
            renderList();
        });
        item.querySelector('#btn-remove').addEventListener('click', () => {
            toDoItems[i].removeItem();
            renderList();
        });
        item.querySelector('input').addEventListener('change', () => {
            toDoItems[i].checkItem();
            renderList();
        });
    });
    document.querySelector('#actionPanel1').style.display = countCheckedItems >= 1 ? 'none' : 'flex';
    document.querySelector('#actionPanel2').style.display = countCheckedItems >= 1 ? 'block' : 'none';
}

document.querySelector('#selectAll').addEventListener('click', () => {
    toDoItems.forEach(item => {
        item.checked = true;
    });
    renderList();
});

document.querySelector('#doneAction').addEventListener('click', () => {
    toDoItems.forEach(item => {
        if (item.checked) {
            item.doneItem();
        }
    });
    renderList();
});

document.querySelector('#restoreAction').addEventListener('click', () => {
    toDoItems.forEach(item => {
        if (item.checked) {
            item.restoreItem();
        }
    });
    renderList();
});

document.querySelector('#removeAction').addEventListener('click', () => {
    const notCheckedItems = [];
    toDoItems.forEach(item => {
        if (!item.checked) {
            notCheckedItems.push(item);
        }
    });
    toDoItems = notCheckedItems;
    renderList();
});