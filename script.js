const product = {
    plainBurger: {
        name: 'Гамбургер простой',
        price: 10000,
        kcall: 400,
        amount: 0,
        descr: 'Встречайте простой ГАМБУРГЕР. Он не сочный и не сытный за то дешевый',
        img: 'images/product2.jpg',

        get SUMM() {
            return this.price * this.amount;
        },
        get KCALL() {
            return this.kcall * this.amount;
        }
    },
    freshBurger: {
        name: 'Гамбургер FRESH',
        price: 20500,
        kcall: 800,
        amount: 0,
        descr: 'Встречайте Фрешмена FAS FOOD`а. Он набрал в себя всё самое старое.',
        img: 'images/product1.jpg',

        get SUMM() {
            return this.price * this.amount;
        },
        get KCALL() {
            return this.kcall * this.amount;
        }
    },
    freshCombo: {
        name: 'Гамбургер FRESH',
        price: 31900,
        kcall: 900,
        amount: 0,
        descr: 'FRESH и Картошка фри. Тот же самый FRESH и Фри объяденились.',
        img: 'images/product3.jpg',

        get SUMM() {
            return this.price * this.amount;
        },
        get KCALL() {
            return this.kcall * this.amount;
        }
    },
    bestBurger: {
        name: 'BEST бургер',
        price: 50000,
        kcall: 1600,
        amount: 0,
        descr: 'Самый вкусный бургер в меню',
        img: 'https://www.ipswichcodfather.co.uk/wp-content/uploads/2020/07/Burger-B-scaled-1-1-1536x1024.jpg',

        get SUMM() {
            return this.price * this.amount;
        },
        get KCALL() {
            return this.kcall * this.amount;
        }
    }
}

const extraProduct = {
    doubleMayonnaise: {
        name: 'Двойной майонез',
        price: 2000,
        kcall: 100
    },
    lettuce: {
        name: 'Салатный лист',
        price: 4000,
        kcall: 20
    },
    cheese: {
        name: 'Сыр',
        price: 5000,
        kcall: 130
    }
}

let result = '';

setTimeout(() => createProduct(), 1000) ;

function logic() {



const btnPlusOrMinus = document.querySelectorAll('.main__product-btn');
const checkExtraProduct = document.querySelectorAll('.main__product-checkbox');
const addCart = document.querySelector('.addCart');
const receipt = document.querySelector('.receipt');
const receiptWindow = document.querySelector('.receipt__window');
const receiptOut = document.querySelector('.receipt__window-out');
const payBtn = document.querySelector('.receipt__window-btn');
const logo = document.querySelector('.header__timer-extra');
const imgElement = document.querySelectorAll('.main__product-info');

let cart = [];
let fullName = '';
let fullPrice = 0;
let fullKcall = 0;

increaseLvl(0);

btnPlusOrMinus.forEach((btn) => {

    btn.addEventListener('click', function() {
        plusOrMinus(this);
    })
})

checkExtraProduct.forEach(product => {

    product.addEventListener('click', function() {
        addExtraProduct(this);
    })
})

imgElement.forEach(img => {
    img.addEventListener('dblclick', zoomImg)
})

addCart.addEventListener('click', () => {
    
    for(const key in product) {
        let burger = product[key]

        if(burger.amount > 0) {
            
            for(const newKey in burger) {
                if(burger[newKey] === true) {
                    burger.name += '\n' + extraProduct[newKey].name
                }
            }
            cart.push(burger)
        };
    }
    
    cart.forEach(burger => {

        fullName += '\n' + burger.name + '\n' + 'Колличество:' + burger.amount + '\n';
        fullPrice += burger.SUMM;
        fullKcall += burger.KCALL;
    })

    receipt.style.display = 'flex';
    setTimeout(() => {

        receipt.style.opacity = '1';
        receiptWindow.style.top = '0';
    }, 100)

    receiptOut.innerHTML = `Ваш заказ: \n ${fullName} \nКаллорийность: ${fullKcall} \nОбщая сумма: ${fullPrice}сумм`;

    const amount = document.querySelectorAll('.main__product-num');
    const price = document.querySelectorAll('.main__product-price span');
    const kcall = document.querySelectorAll('.main__product-kcall span');

    for(let i = 0; i < amount.length; i++) {
        amount[i].innerText = 0;
        price[i].innerText = 0;
        kcall[i].innerText = 0;
    }
})

function plusOrMinus(element) {

    const parentNode = element.closest('.main__product');
    const parentId = parentNode.getAttribute('id');
    const output = parentNode.querySelector('.main__product-num');
    const price = parentNode.querySelector('.main__product-price span');
    const kcall = parentNode.querySelector('.main__product-kcall span');
    let productAmount = product[parentId]['amount'];

    if(element.dataset.symbol === '+') {
        productAmount++

    } else {
        productAmount > 0 ? productAmount-- : '';
    }

    product[parentId]['amount'] = productAmount;
    
    output.innerText = productAmount;
    price.innerText = product[parentId].SUMM;
    kcall.innerText = product[parentId].KCALL;
}

function increaseLvl(lvl) {

    if(lvl === 100) return;
    
    lvl++;
    logo.innerHTML = lvl

    let timeout = setTimeout(() => increaseLvl(lvl), lvl + lvl / 4);
}



function addExtraProduct(secondProduct) {

    const parentNode = secondProduct.closest('.main__product');
    const parentId = parentNode.getAttribute('id');
    const price = parentNode.querySelector('.main__product-price span');
    const kcall = parentNode.querySelector('.main__product-kcall span');
    const extraData = secondProduct.dataset.extra;

    product[parentId][secondProduct.dataset.extra] = secondProduct.checked;

    if(product[parentId][extraData]) {

        product[parentId].price += extraProduct[extraData].price
        product[parentId].kcall += extraProduct[extraData].price
    } else {

        product[parentId].price -= extraProduct[extraData].price
        product[parentId].kcall -= extraProduct[extraData].price
    }

    price.innerHTML = product[parentId].SUMM;
    kcall.innerHTML = product[parentId].KCALL;
}

function zoomImg(element) {
    const viewElement = document.querySelector('.view');
    const parentId = element.target.closest('.main__product').getAttribute('id');
    const closeBtn = viewElement.querySelector('.view__close');

    viewElement.classList.add('active');
    viewImg = product[parentId].img;
    viewElement.querySelector('img').setAttribute('src', viewImg);

    closeBtn.addEventListener('click', () => {
        viewElement.classList.remove('active');
    })
}

payBtn.addEventListener('click', () => location.reload());
}

function createProduct() {
    const mainElement = document.querySelector('.main');

    for(const key in product) {

        const { name, descr, img, price } = product[key];
        result += `
                <section class="main__product" id="${key}">
                        <div class="main__product-preview">
                            <div class="main__product-info">
                                <img src="${img}" alt="" class="main__product-img">
                                <h2 class="main__product-title">${name}
                                    <span class="main__product-many">${price} сум</span>
                                </h2>
                            </div>
                            <p class="main__product-descr">
                                ${descr}
                            </p>
                        </div>
                        <div class="main__product-extra">
                            <div class="main__product-number">
                                <a class="main__product-btn fa-reg minus" data-symbol="-"></a>
                                <output class="main__product-num">0</output>
                                <a class="main__product-btn fa-reg plus" data-symbol="+"></a>
                            </div>
                            <div class="main__product-price"><span>0</span> сум</div>
                        </div>
                    <div class="main__product-extraProduct">
                `;

        for(const newKey in extraProduct) {
            result += `
                <label class="main__product-label">
                    <input type="checkbox" class="main__product-checkbox" data-extra="${newKey}">
                    <span class="main__product-check"></span>
                    ${extraProduct[newKey].name}
                </label>
            `;
        }

        result += `
                </div>
                <div class="main__product-kcall"><span>0</span> калорий</div>
            </section>
        `;
    }

    mainElement.innerHTML = result;

    logic();
}