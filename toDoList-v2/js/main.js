const selectAllButton = document.querySelector('#selectAll');
const doneButton = document.querySelector('#doneAction');
const restoreButton = document.querySelector('#restoreAction');
const removeButton = document.querySelector('#removeAction');
let countCheckedItems = 0;

document.querySelector('.form-control').addEventListener('keydown', function (e) {
    if (this.value !== '' && e.keyCode === 13) {
        const listItem = document.createElement('li');
        listItem.classList.add('item');
        listItem.innerHTML = `<input class="form-check-input" type="checkbox" id=${this.value}>
                    <label class="form-check-label" for=${this.value}>${this.value}</label>
                    <button type="button" class="btn btn-outline-primary btn-done">Done</button>`;
        document.querySelector('.list-group').insertAdjacentElement('afterbegin', listItem);
        doneAndRemoveOneItem(listItem);
        doneRestoreAndRemoveSomeItems(listItem);
        doneRestoreAndRemoveAllItems(listItem);
        this.value = '';
    }
});

function doneAndRemoveOneItem(item) {
    item.querySelector('.btn-done').addEventListener('click', function () {
        if (this.innerHTML === 'Done') {
            item.querySelector('.form-check-label').classList.add('todoDone');
            this.classList = 'btn btn-outline-danger btn-done';
            this.innerHTML = 'Remove';
        } else if (this.innerHTML === 'Remove') {
            if (item.querySelector('.form-check-input').checked) {
                item.querySelector('.form-check-input').checked = false;
                countCheckedItems--;
            }
            if (countCheckedItems === 0) {
                showPanels('flex', 'none');
            }
            item.remove();
        }
    });
}

function doneRestoreAndRemoveSomeItems(item) {
    item.querySelector('.form-check-input').addEventListener('change', function () {
        if (this.checked) {
            buttonOnSecondPanel(doneButton, item);
            buttonOnSecondPanel(restoreButton, item);
            buttonOnSecondPanel(removeButton, item);
            countCheckedItems++;
        } else {
            countCheckedItems--;
        }
        if (countCheckedItems >= 1) {
            showPanels('none', 'block');
        } else if (countCheckedItems === 0) {
            showPanels('flex', 'none');
        }
    });
}

function doneRestoreAndRemoveAllItems(item) {
    selectAllButton.addEventListener('click', () => {
        if (document.querySelector('.list-group').innerHTML !== '') {
            item.querySelector('.form-check-input').checked = true;
            countCheckedItems = document.querySelector('.list-group').children.length;
            buttonOnSecondPanel(doneButton, item);
            buttonOnSecondPanel(restoreButton, item);
            buttonOnSecondPanel(removeButton, item);
            showPanels('none', 'block');
        }
    });
}

function buttonOnSecondPanel(btn, item) {
    btn.addEventListener('click', clickFun);

    function clickFun() {
        if (item.querySelector('.form-check-input').checked) {
            if (btn === doneButton) {
                item.querySelector('.form-check-label').classList.add('todoDone');
                item.querySelector('.btn-done').classList = 'btn btn-outline-danger btn-done';
                item.querySelector('.btn-done').innerHTML = 'Remove';
            } else if (btn === restoreButton) {
                item.querySelector('.form-check-label').classList.remove('todoDone');
                item.querySelector('.btn-done').classList = 'btn btn-outline-primary btn-done';
                item.querySelector('.btn-done').innerHTML = 'Done';
            } else if (btn === removeButton) {
                item.remove();
            }
        }
        showPanels('flex', 'none');
        item.querySelector('.form-check-input').checked = false;
        countCheckedItems = 0;
        btn.removeEventListener('click', clickFun);
    }
}

function showPanels(value1, value2) {
    document.querySelector('#actionPanel1').style.display = value1;
    document.querySelector('#actionPanel2').style.display = value2;
}