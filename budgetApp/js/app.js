const addTypeSelect = document.querySelector('.add__type');
const addDescriptionInput = document.querySelector('.add__description');
const addValueInput = document.querySelector('.add__value');
const addButton = document.querySelector('.add__btn');

const budgetFinalValue = document.querySelector('.budget__value');
const budgetIncomeValue = document.querySelector('.budget__income--value');
const budgetExpensesValue = document.querySelector('.budget__expenses--value');

const incomeListDiv = document.querySelector('.income__list');
const incomeListDivUl = document.createElement('ul');

const expensesListDiv = document.querySelector('.expenses__list');
const expensesListDivUl = document.createElement('ul');

let sumIncome = 0;
let sumExpenses = 0;

if (addTypeSelect.options[addTypeSelect.selectedIndex].value == 'plus') {
    addButton.addEventListener('click', incomeFunction);
    addButton.removeEventListener('click', expensesFunction);
    addButton.style.color = '#28B9B5';
}

addTypeSelect.addEventListener('change', () => {
    if (addTypeSelect.options[addTypeSelect.selectedIndex].value == 'minus') {
        addButton.removeEventListener('click', incomeFunction);
        addButton.addEventListener('click', expensesFunction);
        addButton.style.color = '#FF5049';
    } else if (addTypeSelect.options[addTypeSelect.selectedIndex].value == 'plus') {
        addButton.addEventListener('click', incomeFunction);
        addButton.removeEventListener('click', expensesFunction);
        addButton.style.color = '#28B9B5';
    }
});

function incomeFunction() {
    if (addDescriptionInput.value != '' && addValueInput.value != '') {
        let incomeListUlItem, incomeListUlItemLeft,
            incomeListUlItemRight, incomeListUlItemRightValue, incomeListUlItemRightIcon;

        createElements(incomeListDiv, incomeListDivUl, incomeListUlItem,
            incomeListUlItemLeft, incomeListUlItemRight, incomeListUlItemRightValue,
            incomeListUlItemRightIcon, '#28B9B5', '+', 'img/plus.svg');

        sumIncome += +addValueInput.value;
        budgetIncomeValue.innerHTML = '+ ' + sumIncome;
        budgetFinalValue.innerHTML = +budgetFinalValue.innerHTML + +addValueInput.value;
        budgetFinalValueColor();
        clearInputs();
    }
}

function expensesFunction() {
    if (addDescriptionInput.value != '' && addValueInput.value != '') {
        let expensesListUlItem, expensesListUlItemLeft,
            expensesListUlItemRight, expensesListUlItemRightValue, expensesListUlItemRightIcon;

        createElements(expensesListDiv, expensesListDivUl, expensesListUlItem,
            expensesListUlItemLeft, expensesListUlItemRight, expensesListUlItemRightValue,
            expensesListUlItemRightIcon, '#FF5049', '-', 'img/minus.svg');

        sumExpenses += +addValueInput.value;
        budgetExpensesValue.innerHTML = '- ' + sumExpenses;
        budgetFinalValue.innerHTML = +budgetFinalValue.innerHTML - +addValueInput.value;
        budgetFinalValueColor();
        clearInputs();
    }
}

function createElements(div, ul, item, itemLeft, itemRight,
    itemRightValue, itemRightIcon, itemRightColor, symbol, src) {
    itemLeft = document.createElement('div');
    item = document.createElement('li');
    itemRight = document.createElement('div');
    itemRightValue = document.createElement('div');
    itemRightIcon = document.createElement('img');
    itemRight.style.color = itemRightColor;
    div.appendChild(ul);
    ul.appendChild(item);
    item.appendChild(itemLeft);
    item.appendChild(itemRight);
    itemLeft.innerHTML = addDescriptionInput.value;
    itemRightValue.innerHTML = symbol + ' ' + addValueInput.value;
    itemRight.classList.add('li_right');
    itemRightValue.classList.add('div_right');
    itemRightIcon.setAttribute('src', src);
    itemRight.appendChild(itemRightValue);
    itemRight.appendChild(itemRightIcon);

    if (itemRightIcon.getAttribute('src') == 'img/plus.svg') {
        itemRightIcon.addEventListener('click', deleteIncomeItems);
        itemRightIcon.removeEventListener('click', deleteExpensesItems);
    } else if (itemRightIcon.getAttribute('src') == 'img/minus.svg') {
        itemRightIcon.addEventListener('click', deleteExpensesItems);
        itemRightIcon.removeEventListener('click', deleteIncomeItems);
    }

    function deleteIncomeItems() {
        sumIncome -= +itemRightValue.innerHTML.slice(2);
        budgetIncomeValue.innerHTML = '+ ' + sumIncome;
        budgetFinalValue.innerHTML = +budgetFinalValue.innerHTML - +itemRightValue.innerHTML.slice(2);
        budgetFinalValueColor()
        if (+budgetIncomeValue.innerHTML.slice(2) == 0) {
            budgetIncomeValue.innerHTML = 0;
        }
        item.remove();
    }

    function deleteExpensesItems() {
        sumExpenses -= +itemRightValue.innerHTML.slice(2);
        budgetExpensesValue.innerHTML = '- ' + sumExpenses;
        budgetFinalValue.innerHTML = +budgetFinalValue.innerHTML + +itemRightValue.innerHTML.slice(2);
        budgetFinalValueColor()
        if (+budgetExpensesValue.innerHTML.slice(2) == 0) {
            budgetExpensesValue.innerHTML = 0;
        }
        item.remove();
    }

}

function budgetFinalValueColor() {
    if (+budgetFinalValue.innerHTML > 0) {
        document.querySelector('span').innerHTML = '+ ';
        document.querySelector('span').style.color = '#28B9B5';
        budgetFinalValue.style.color = '#28B9B5';
    } else if (+budgetFinalValue.innerHTML < 0) {
        document.querySelector('span').innerHTML = '';
        budgetFinalValue.style.color = '#FF5049';
    } else {
        document.querySelector('span').innerHTML = '';
        budgetFinalValue.style.color = '#fff';
    }
}

function clearInputs() {
    addDescriptionInput.value = '';
    addValueInput.value = '';
} 