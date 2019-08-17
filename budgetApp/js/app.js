const items = {
    incomes: [],
    expenses: [],
};

class Item {
    constructor(obj) {
        this.title = obj.title;
        this.symbol = obj.symbol;
        this.value = obj.value;
    }
    addItem() {
        if (this.symbol === '+') {
            items.incomes.push(this);
        } else if (this.symbol === '-') {
            items.expenses.push(this);
        }
    }
    removeItem() {
        if (this.symbol === '+') {
            items.incomes.splice(items.incomes.indexOf(this), 1);
        } else if (this.symbol === '-') {
            items.expenses.splice(items.expenses.indexOf(this), 1);
        }
    }
    renderItem() {
        return `
            <li>
                <p class="text">${this.title}</p>
                <div style="color: ${this.symbol === '+' ? '#28B9B5' : '#FF5049'}">
                    <p class="value">${this.symbol} ${this.value}</p>
                    <div class="icon" style="border: 1px solid ${this.symbol === '+' ? '#28B9B5' : '#FF5049'}"></div>
                </div>
            </li>`
    }
}

const options = document.querySelector('select').options;
let selectedOption = options[options.selectedIndex].innerHTML;
const addButton = document.querySelector('.add__btn');
const addDescriptionInput = document.querySelector('.add__description');
const addValueInput = document.querySelector('.add__value');

document.querySelector('select').addEventListener('change', () => {
    selectedOption = options[options.selectedIndex].innerHTML;
    if (selectedOption === '-') {
        addButton.style.color = '#FF5049';
    } else if (selectedOption === '+') {
        addButton.style.color = '#28B9B5';
    }
})

addButton.addEventListener('click', () => {
    if (addDescriptionInput.value.trim().length && addValueInput.value.trim().length && +addValueInput.value > 0) {
        new Item({
            title: addDescriptionInput.value,
            symbol: selectedOption,
            value: +addValueInput.value
        }).addItem();
        renderItems();
        addDescriptionInput.value = '';
        addValueInput.value = '';
    }
})

function renderItems() {
    let s1 = 0;
    let s2 = 0;
    document.querySelector('.income__list').innerHTML = '';
    document.querySelector('.expenses__list').innerHTML = '';
    items.incomes.forEach(item => {
        s1 += item.value;
        document.querySelector('.income__list').innerHTML += item.renderItem();
    });
    items.expenses.forEach(item => {
        s2 += item.value;
        document.querySelector('.expenses__list').innerHTML += item.renderItem();
    });
    [...document.querySelector('.income__list').children].forEach((item, i) => {
        item.querySelector('.icon').addEventListener('click', () => {
            items.incomes[i].removeItem();
            renderItems();
        });
    });
    [...document.querySelector('.expenses__list').children].forEach((item, i) => {
        item.querySelector('.icon').addEventListener('click', () => {
            items.expenses[i].removeItem();
            renderItems();
        });
    })
    document.querySelector('.budget__income--value .value').innerHTML = s1;
    document.querySelector('.budget__income--value .symbol').innerHTML = s1 !== 0 ? '+' : '';
    document.querySelector('.budget__expenses--value .value').innerHTML = s2;
    document.querySelector('.budget__expenses--value .symbol').innerHTML = s2 !== 0 ? '-' : '';
    document.querySelector('.final-budget .budget__value').innerHTML = s1 - s2;
    document.querySelector('.final-budget span').innerHTML = (s1 - s2) > 0 ? '+' : '';
    document.querySelector('.final-budget').style.color = (s1 - s2) > 0 ? '#28B9B5' : (s1 - s2) < 0 ? '#FF5049' : '#fff';
}