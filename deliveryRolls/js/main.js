main();

function main() {
	const loadRolls = async (url, callback) => {
		await fetch(url)
			.then(response => response.json())
			.then(json => createElements(json.rolls));
		callback();
	}

	function createElements(arr) {
		const rollsWrapper = document.querySelector('.rolls');
		arr.forEach(item => {
			const cardItem = document.createElement("div");
			cardItem.classList.add('card');
			cardItem.classList.add('card-item');
			cardItem.innerHTML = `<img src="${item.src}" alt="" class="product-img">
						<div class="card-body">
							<h4 class="item-title">${item.title}</h4>
							<p><small class="text-muted">6 шт.</small></p>
							<div class="details-wrapper">
								<div class="items">
									<div class="items__control items__control-minus">-</div>
									<div class="items__current">1</div>
									<div class="items__control items__control-plus">+</div>
								</div>
								<div class="price">
									<div class="price__weight">${item.weight}г.</div>
									<div class="price__currency">${item.price} ₽</div>
								</div>
							</div>
							<button type="button" class="btn btn-block btn-outline-warning">Добавить в корзину</button>
						</div>`;
			rollsWrapper.appendChild(cardItem);
		});
	}

	loadRolls('js/rolls.json', () => {
		const cardImg = document.querySelectorAll(".product-img");
		const cardTitle = document.querySelectorAll(".item-title");
		const cardWeight = document.querySelectorAll(".price__weight");
		const cardControlMinus = document.querySelectorAll(".items__control-minus");
		const cardControlPlus = document.querySelectorAll(".items__control-plus");
		const cardControlCount = document.querySelectorAll(".items__current");
		const cardPrice = document.querySelectorAll(".price__currency");
		const totalPrice = document.querySelector(".total-price");
		const totalPriceWithoutDelivery = document.querySelector(".amount-without-delivery");

		const button = document.querySelectorAll(".btn-block");
		const basket = document.querySelector(".cart-products");

		let sum = 0;
		document.querySelector(".basket-not-empty").style.display = "none";

		for (let i = 0; i < button.length; i++) {
			button[i].addEventListener("click", () => {
				if (button[i].innerHTML == "Добавить в корзину") {
					document.querySelector(".basket-empty").style.display = "none";
					document.querySelector(".basket-not-empty").style.display = "block";

					const item = document.createElement("div");
					item.classList.add("cart-item");
					item.innerHTML = `<div class="cart-item__top">
										<div class="cart-item__img">
											<img src=${cardImg[i].getAttribute('src')} alt="">
										</div>
										<div class="cart-item__desc">
											<div class="cart-item__title">${cardTitle[i].innerHTML}</div>
											<div class="cart-item__weight">6 шт. / ${cardWeight[i].innerHTML}</div>						
											<div class="cart-item__details">
												<div class="items items--small">
													<div class="items__control items__control-minus">-</div>
													<div class="items__current">${cardControlCount[i].innerHTML}</div>
													<div class="items__control items__control-plus">+</div>
												</div>
												<div class="price">
													<div class="price__currency">${cardPrice[i].innerHTML}</div>
												</div>
											</div>						
										</div>
								</div>`;
					basket.appendChild(item);
					const itemDetailsSmallMinus = item.querySelector('.items__control-minus');
					const itemDetailsSmallPlus = item.querySelector('.items__control-plus');
					const itemDetailsSmallCount = item.querySelector('.items__current');
					const itemPrice = item.querySelector('.price__currency');

					countInBasket(itemDetailsSmallMinus, itemDetailsSmallCount, itemPrice, item, button[i]);
					countInBasket(itemDetailsSmallPlus, itemDetailsSmallCount, itemPrice);

					sum += +cardControlCount[i].innerHTML * +cardPrice[i].innerHTML.slice(0, 3);
					totalPriceWithoutDelivery.innerHTML = sum;
					finalAmount();
					button[i].innerHTML = "Удалить из корзины";
					button[i].classList.add("bg-btn");
					cardControlCount[i].innerHTML = 1;
				} else if (button[i].innerHTML == "Удалить из корзины") {
					for (let j = 0; j < basket.children.length; j++) {
						if (basket.children[j].querySelector(".cart-item__title").innerHTML == cardTitle[i].innerHTML) {
							const count = basket.children[j].querySelector(".items__current").innerHTML;
							const price = basket.children[j].querySelector(".price__currency").innerHTML.slice(0, 3);
							sum -= +count * +price;
							totalPriceWithoutDelivery.innerHTML = sum;
							finalAmount();
							emptyBasket();
							basket.children[j].remove();
							button[i].innerHTML = "Добавить в корзину";
							button[i].classList.remove("bg-btn");
						}
					}
				}
			});
		}

		getCount(cardControlMinus);
		getCount(cardControlPlus);

		function finalAmount() {
			if (sum < 1650) {
				document.querySelector(".free").innerHTML = "250 ₽";
				document.querySelector(".free").classList.add("rouble");
				totalPrice.innerHTML = sum + +document.querySelector(".free").innerHTML.slice(0, 3);
			} else if (sum >= 1650) {
				document.querySelector(".free").innerHTML = "Бесплатно";
				document.querySelector(".free").classList.remove("rouble");
				totalPrice.innerHTML = sum;
			}
		}

		function getCount(symbol) {
			for (let i = 0; i < symbol.length; i++) {
				symbol[i].addEventListener("click", () => {
					if (symbol[i].innerHTML == "+") {
						+cardControlCount[i].innerHTML++;
					} else if (symbol[i].innerHTML == "-") {
						+cardControlCount[i].innerHTML--;
						if (+cardControlCount[i].innerHTML < 1) {
							cardControlCount[i].innerHTML = 1;
						}
					}
				});
			}
		}

		function countInBasket(symbol, count, price, item, btn) {
			symbol.addEventListener("click", () => {
				if (symbol.innerHTML == "+") {
					+count.innerHTML++;
					sum += +price.innerHTML.slice(0, 3);
				} else if (symbol.innerHTML == "-") {
					+count.innerHTML--;
					if (+count.innerHTML < 1) {
						item.remove();
						btn.innerHTML = "Добавить в корзину";
						btn.classList.remove("bg-btn");
					}
					sum -= +price.innerHTML.slice(0, 3);
				}
				totalPriceWithoutDelivery.innerHTML = sum;
				finalAmount();
				emptyBasket();
			});
		}

		function emptyBasket() {
			if (+totalPrice.innerHTML == 250) {
				document.querySelector(".basket-empty").style.display = "block";
				document.querySelector(".basket-not-empty").style.display = "none";
			}
		}
	});
}