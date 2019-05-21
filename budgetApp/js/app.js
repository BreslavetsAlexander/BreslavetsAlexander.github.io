const addTypeSelect = document.querySelector('.add__type');
const addDescriptionInput = document.querySelector('.add__description');
const addValueInput = document.querySelector('.add__value');
const addButton = document.querySelector('.add__btn');

const budgetFinalValue = document.querySelector('.budget__value');
const budgetIncomeValue = document.querySelector('.budget__income--value');
const budgetExpensesValue = document.querySelector('.budget__expenses--value');

const incomeList = document.querySelector('.income__list');
const expensesList = document.querySelector('.expenses__list');

getSelectedOption(addTypeSelect.options[addTypeSelect.selectedIndex].value);

addTypeSelect.addEventListener('change', () => {
    getSelectedOption(addTypeSelect.options[addTypeSelect.selectedIndex].value);
});

function getSelectedOption(symbol) {
    if (symbol === 'minus') {
        addButton.addEventListener('click', expensesFunction);
        addButton.removeEventListener('click', incomeFunction);
        addButton.style.color = '#FF5049';
    } else if (symbol === 'plus') {
        addButton.addEventListener('click', incomeFunction);
        addButton.removeEventListener('click', expensesFunction);
        addButton.style.color = '#28B9B5';
    }
}

function incomeFunction() {
    createItem('+', 'img/plus.svg', incomeList, '#28B9B5', budgetIncomeValue);
}

function expensesFunction() {
    createItem('-', 'img/minus.svg', expensesList, '#FF5049', budgetExpensesValue);
}

function createItem(symbol, src, ul, color, value) {
    if (addDescriptionInput.value !== '' && addValueInput.value !== '') {
        const item = document.createElement('li');
        item.innerHTML = `<div>${addDescriptionInput.value}</div>
        <div class="li_right" style="color: ${color}">
            <div class="div_right">${symbol} ${addValueInput.value}</div>
            <img src="${src}">
        </div>`;
        ul.appendChild(item);
        value.querySelector('.symbol').innerHTML = symbol;
        value.querySelector('.value').innerHTML = +value.querySelector('.value').innerHTML + +addValueInput.value;
        if (value === budgetExpensesValue) {
            budgetFinalValue.innerHTML = +budgetFinalValue.innerHTML - +addValueInput.value;
        } else if (value === budgetIncomeValue) {
            budgetFinalValue.innerHTML = +budgetFinalValue.innerHTML + +addValueInput.value;
        }
        budgetFinalValueColor();
        item.querySelector('img').addEventListener('click', function () {
            value.querySelector('.value').innerHTML = +value.querySelector('.value').innerHTML - +item.querySelector('.div_right').innerHTML.slice(2);
            if (this.getAttribute('src') === 'img/plus.svg') {
                budgetFinalValue.innerHTML = +budgetFinalValue.innerHTML - +item.querySelector('.div_right').innerHTML.slice(2);
            } else if (this.getAttribute('src') === 'img/minus.svg') {
                budgetFinalValue.innerHTML = +budgetFinalValue.innerHTML + +item.querySelector('.div_right').innerHTML.slice(2);
            }
            if (+value.querySelector('.value').innerHTML === 0) {
                value.querySelector('.symbol').innerHTML = '';
            }
            budgetFinalValueColor();
            item.remove();
        });
        addDescriptionInput.value = '';
        addValueInput.value = '';
    }
}

function budgetFinalValueColor() {
    if (+budgetFinalValue.innerHTML > 0) {
        document.querySelector('.final-budget>span').innerHTML = '+ ';
        document.querySelector('.final-budget').style.color = '#28B9B5';
    } else if (+budgetFinalValue.innerHTML < 0) {
        document.querySelector('.final-budget>span').innerHTML = '';
        document.querySelector('.final-budget').style.color = '#FF5049';
    } else {
        document.querySelector('.final-budget>span').innerHTML = '';
        document.querySelector('.final-budget').style.color = '#fff';
    }
}