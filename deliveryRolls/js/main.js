let rolls = [];
const rollsInBasket = [];

class Roll {
    constructor(obj) {
        this.src = obj.src;
        this.title = obj.title;
        this.count = obj.count;
        this.weight = obj.weight;
        this.price = obj.price;
        this.inBasket = false;
    }
    addRoll() {
        rollsInBasket.push(this);
        this.inBasket = true;
    }
    changeCount(a) {
        this.count += a;
        if (this.count < 1) {
            this.removeRoll();
        }
    }
    removeRoll() {
        rollsInBasket.splice(rollsInBasket.indexOf(this), 1);
        this.inBasket = false;
        this.count = 1;
    }
    renderRoll() {
        return `
            <div class="card card-item">
                <img src="${this.src}" alt="" class="product-img">
                <div class="card-body">
                    <h4 class="item-title">${this.title}</h4>
                    <p><small class="text-muted">6 шт.</small></p>
                    <div class="details-wrapper">
                        <div class="items">
                            <div class="items__control items__control-minus">-</div>
                            <div class="items__current">${this.count}</div>
                            <div class="items__control items__control-plus">+</div>
                        </div>
                        <div class="price">
                            <div class="price__weight"><span>${this.weight}</span>г.</div>
                            <div class="price__currency"><span>${this.price}</span> ₽</div>
                        </div>
                    </div>
                    <button type="button" class="item-btn btn btn-block btn-outline-warning ${this.inBasket ? 'bg-btn' : ''}">${!this.inBasket ? 'Добавить в корзину' : 'Удалить из корзины'}</button>
                </div>
            </div>`
    }
    renderRollInBasket() {
        return `
			<div class="cart-item">
				<div class="cart-item__top">
					<div class="cart-item__img">
						<img src="${this.src}" alt="">
					</div>
					<div class="cart-item__desc">
						<div class="cart-item__title">${this.title}</div>
						<div class="cart-item__weight"><span>6</span> шт. / <span>${this.weight}</span>г.</div>						
						<div class="cart-item__details">
							<div class="items items--small">
								<div class="items__control items__control-minus">-</div>
								<div class="items__current">${this.count}</div>
								<div class="items__control items__control-plus">+</div>
							</div>
							<div class="price">
								<div class="price__currency">${this.price} ₽</div>
							</div>
						</div>						
					</div>
				</div>
			</div>`
    }
}

const loadRolls = async () => {
    await fetch('js/rolls.json')
        .then(response => response.json())
        .then(json => {
            json.rolls.forEach(item => {
                rolls.push(new Roll(item));
            })
        });
    rolls.forEach(item => {
        item.count = 1;
    })
    renderRolls();
};
loadRolls();

function renderRolls() {
    document.querySelector('.rolls').innerHTML = '';
    rolls.forEach(item => {
        document.querySelector('.rolls').innerHTML += item.renderRoll();
    });
    [...document.querySelector('.rolls').children].forEach((item, i) => {
        item.querySelector('.items__control-minus').addEventListener('click', () => {
            if (rolls[i].count > 1) {
                rolls[i].count--;
            } else {
                let index = rollsInBasket.findIndex(value => (value.title === rolls[i].title));
                if (index !== -1) {
                    rollsInBasket[index].removeRoll();
                }
            }
            renderRolls();
            renderBasket();
        })
        item.querySelector('.items__control-plus').addEventListener('click', () => {
            rolls[i].count++;
            renderRolls();
            renderBasket();
        })
        item.querySelector('.item-btn').addEventListener('click', () => {
            if (!rolls[i].inBasket) {
                rolls[i].addRoll();
            } else {
                rolls[i].removeRoll();
            }
            renderRolls();
            renderBasket();
        })
    })
}

function renderBasket() {
    let sum = 0;
    const delivery = 250;
    document.querySelector('.cart-products').innerHTML = '';
    rollsInBasket.forEach(item => {
        sum += item.count * item.price;
        document.querySelector('.cart-products').innerHTML += item.renderRollInBasket();
    });
    [...document.querySelector('.cart-products').children].forEach((item, i) => {
        item.querySelector('.items__control-minus').addEventListener('click', () => {
            rollsInBasket[i].changeCount(-1);
            renderBasket();
            renderRolls();
        });
        item.querySelector('.items__control-plus').addEventListener('click', () => {
            rollsInBasket[i].changeCount(1);
            renderBasket();
            renderRolls();
        });
    });
    document.querySelector('.empty').style.display = sum > 0 ? 'none' : 'block';
    document.querySelector('.basket-wrap').style.display = sum > 0 ? 'block' : 'none';
    document.querySelector('.without-delivery').innerHTML = sum + ' ₽';
    document.querySelector('.delivery-cost').classList = sum >= 1650 ? 'delivery-cost free' : 'delivery-cost rouble';
    document.querySelector('.delivery-cost').innerHTML = sum >= 1650 ? 'Бесплатно' : delivery + ' ₽';
    document.querySelector('.total-price').innerHTML = sum >= 1650 ? sum + ' ₽' : (sum + delivery) + ' ₽';
}