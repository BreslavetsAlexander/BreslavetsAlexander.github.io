const goodsInBasket = [];

class Phone {
    constructor(obj) {
        this.src = obj.src;
        this.title = obj.title;
        this.price = obj.price;
        this.count = obj.count;
        this.btnParent = obj.btnParent;
    }
    renderPhone() {
        return `
                <div class="goods__item">
                    <img class="goods__img" src="${this.src}" alt="phone">
                    <div class="goods__colors">Доступно цветов: 4</div>
                    <div class="goods__title">${this.title}...</div>
                    <div class="goods__price">
                        <span>${this.price}</span> руб/шт
                    </div>
                    <div class="goods__item-remove">
                        <img src="img/close.svg" alt=""/>
                    </div>
                    <div class="count__wrapper">
                        <div class="minus">-</div>
                        <div>${this.count}</div>
                        <div class="plus">+</div>
                    </div>
                </div>`
    }
    addToBasket() {
        goodsInBasket.push(this);
        this.btnParent.children[0].innerHTML = 'Товар в корзине';
        this.btnParent.children[0].disabled = true;
        this.btnParent.children[1].style.display = 'none';
    }
    changeCount(a) {
        this.count += a;
        if (this.count < 1) {
            this.removeFromBasket();
        }
    }
    removeFromBasket() {
        goodsInBasket.splice(goodsInBasket.indexOf(this), 1);
        this.btnParent.children[0].innerHTML = 'Добавить в корзину';
        this.btnParent.children[0].disabled = false;
        this.btnParent.children[1].style.display = 'block';
        this.btnParent.children[1].value = 1;
    }
}

const loadPhones = async (callback) => {
    await fetch('js/db.json')
        .then(response => response.json())
        .then(json => {
            json.goods.forEach(item => {
                document.querySelector('.goods__wrapper').innerHTML += `
                                    <div class="goods__item">
                                        <img class="goods__img" src="${item.url}" alt="phone">
                                        <div class="goods__colors">Доступно цветов: 4</div>
                                        <div class="goods__title">${item.title.slice(0,50)}...</div>
                                        <div class="goods__price">
                                            <span>${item.price}</span> руб/шт
                                        </div>
                                        <div class="goods__bottom">
                                            <button class="goods__btn">Добавить в корзину</button>
                                            <input type="number" value="1" min="1">
                                        </div>
                                    </div>`
            });
        });
    callback();
};

loadPhones(() => {
    const goodsBtn = document.querySelectorAll('.goods__btn');
    const goodsImg = document.querySelectorAll('.goods__img');
    const goodsTitle = document.querySelectorAll('.goods__title');
    const goodsPrice = document.querySelectorAll('.goods__price>span');
    const goodsInput = document.querySelectorAll('.goods__bottom>input');

    for (let i = 0; i < goodsBtn.length; i++) {
        goodsBtn[i].addEventListener('click', () => {
            new Phone({
                src: goodsImg[i].getAttribute('src'),
                title: goodsTitle[i].innerHTML.slice(0, 50),
                price: +(goodsPrice[i].innerHTML),
                count: +(goodsInput[i].value),
                btnParent: goodsBtn[i].parentElement
            }).addToBasket();
            updateBasket();
            showConfirm();
        });
    }
})

function updateBasket() {
    let sum = 0;
    document.querySelector('.cart__wrapper').innerHTML = '';
    goodsInBasket.forEach(item => {
        document.querySelector('.cart__wrapper').innerHTML += item.renderPhone();
        sum += item.price * item.count;
    });
    Array.from(document.querySelector('.cart__wrapper').children).forEach((item, i) => {
        item.querySelector('.minus').addEventListener('click', () => {
            goodsInBasket[i].changeCount(-1);
            updateBasket();
        });
        item.querySelector('.plus').addEventListener('click', () => {
            goodsInBasket[i].changeCount(1);
            updateBasket();
        });
        item.querySelector('.goods__item-remove').addEventListener('click', () => {
            goodsInBasket[i].removeFromBasket();
            updateBasket();
        });
    });
    document.querySelector('.cart__total>span').innerHTML = sum;
    document.querySelector('.nav__badge').innerHTML = goodsInBasket.length;
    if (sum === 0) {
        document.querySelector('.cart__wrapper').innerHTML = '<div class="empty">Ваша корзина пуста</div>';
    }
}

function showConfirm() {
    document.querySelector(".confirm").style.display = "block";
    let counter = 100;
    const interval = setInterval(frame, 10);

    function frame() {
        if (counter == 10) {
            clearInterval(interval);
            document.querySelector(".confirm").style.display = "none";
        } else {
            counter--;
            document.querySelector(".confirm").style.transform = `translateY(-${counter}px)`;
            document.querySelector(".confirm").style.opacity = "." + counter;
        }
    }
}

document.querySelector('#cart').addEventListener("click", () => {
    document.querySelector(".cart").style.display = 'block';
});

document.querySelector('.cart__close').addEventListener("click", () => {
    document.querySelector(".cart").style.display = 'none';
});