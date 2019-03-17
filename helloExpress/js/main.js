window.addEventListener('DOMContentLoaded', () => {
    const loadContent = async (url, callback) => {
        await fetch(url)
            .then(response => response.json())
            .then(json => createElement(json.goods));
        callback();
    };

    function createElement(arr) {
        const goodsWrapper = document.querySelector('.goods__wrapper');
        arr.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('goods__item');
            card.innerHTML = `
                    <img class="goods__img" src="${item.url}" alt="phone">
                    <div class="goods__colors">Доступно цветов: 4</div>
                    <div class="goods__title">${item.title}</div>
                    <div class="goods__price">
                        <span>${item.price}</span> руб/шт
                    </div>
                    <div class="goods__bottom">
                        <button class="goods__btn">Добавить в корзину</button>
                        <input type="number" value="1" min="1">
                    </div>`;
            goodsWrapper.appendChild(card);
        });
    };

    loadContent('js/db.json', () => {
        const cartTotal = document.querySelector(".cart__total");
        const cartWrapper = document.querySelector(".cart__wrapper");

        const goodsItem = document.querySelectorAll(".goods__item");
        const goodsTitle = document.querySelectorAll(".goods__title");
        const goodsPrice = document.querySelectorAll(".goods__price");
        const goodsBtn = document.querySelectorAll(".goods__btn");
        const goodsInput = document.querySelectorAll(".goods__bottom>input");

        const navBadge = document.querySelector(".nav__badge");
        let totalAmount = 0;

        for (let i = 0; i < goodsBtn.length; i++) {
            goodsTitle[i].innerHTML = goodsTitle[i].innerHTML.slice(0, 50) + "...";
            goodsBtn[i].addEventListener("click", () => {
                goodsBtn[i].disabled = true;
                goodsBtn[i].innerHTML = "Товар в корзине";
                goodsInput[i].style.display = "none";
                showConfirm();
                navBadge.innerHTML++;
                if (+navBadge.innerHTML > 0) {
                    cartWrapper.querySelector(".empty").style.display = "none";
                }
                totalAmount += +goodsPrice[i].querySelector("span").innerHTML * +goodsInput[i].value;
                cartTotal.querySelector("span").innerHTML = totalAmount;

                const goodsInBasket = goodsItem[i].cloneNode(true);
                const circle = document.createElement("div");
                const deleteIcon = document.createElement("img");
                deleteIcon.setAttribute("src", "img/close.svg");
                circle.classList.add("goods__item-remove");
                goodsInBasket.appendChild(circle);
                circle.appendChild(deleteIcon);
                cartWrapper.appendChild(goodsInBasket);

                const countWrapper = document.createElement("div");
                const minusIcon = document.createElement("div");
                const countValue = document.createElement("div");
                const plusIcon = document.createElement("div");
                countWrapper.classList.add("count__wrapper");
                minusIcon.innerHTML = "-";
                countValue.innerHTML = +goodsInput[i].value;
                plusIcon.innerHTML = "+";
                const countArr = [minusIcon, countValue, plusIcon];
                for (let i = 0; i < countArr.length; i++) {
                    countWrapper.appendChild(countArr[i]);
                }

                goodsInBasket.querySelector(".goods__bottom>input").remove();
                goodsInBasket.querySelector(".goods__btn").remove();
                goodsInBasket.appendChild(countWrapper);

                minusIcon.addEventListener("click", () => {
                    +goodsInput[i].value--;
                    totalAmount -= +goodsInBasket.querySelector(".goods__price>span").innerHTML;
                    cartTotal.querySelector("span").innerHTML = totalAmount;
                    countValue.innerHTML = +goodsInput[i].value;
                    if (+goodsInput[i].value < 1) {
                        navBadge.innerHTML--;
                        goodsInBasket.remove();
                        removeDisabled();
                    }
                    emptyCartWrapper();
                });

                plusIcon.addEventListener("click", () => {
                    +goodsInput[i].value++;
                    totalAmount += +goodsInBasket.querySelector(".goods__price>span").innerHTML;
                    cartTotal.querySelector("span").innerHTML = totalAmount;
                    countValue.innerHTML = +goodsInput[i].value;
                });

                deleteIcon.addEventListener("click", () => {
                    totalAmount -= +goodsInBasket.querySelector(".goods__price>span").innerHTML * +goodsInput[i].value;
                    cartTotal.querySelector("span").innerHTML = totalAmount; +
                    navBadge.innerHTML--;
                    removeDisabled();
                    emptyCartWrapper();
                    goodsInBasket.remove();
                });

                function removeDisabled() {
                    goodsBtn[i].disabled = false;
                    goodsBtn[i].innerHTML = 'Добавить в корзину';
                    goodsInput[i].style.display = "block";
                    goodsInput[i].value = 1;
                }

            });
        }

        document.getElementById("cart").addEventListener("click", () => {
            document.querySelector(".cart").style.display = "block";
        });

        document.querySelector(".cart__close").addEventListener("click", () => {
            document.querySelector(".cart").style.display = "none";
        });

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

        function emptyCartWrapper() {
            if (+navBadge.innerHTML == 0) {
                cartWrapper.querySelector(".empty").style.display = "block";
                cartWrapper.querySelector(".empty").innerHTML = "Ваша корзина пуста";
            }
        }
    });
});