const product = {
    plainBurger: {
        name: 'Гамбургер простой',
        price: 10000,
        kcall: 400,
        amount: 0,

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

const btnPlusOrMinus = document.querySelectorAll('.main__product-btn');
const checkExtraProduct = document.querySelectorAll('.main__product-checkbox');
const addCart = document.querySelector('.addCart');
const receipt = document.querySelector('.receipt');
const receiptWindow = document.querySelector('.receipt__window');
const receiptOut = document.querySelector('.receipt__window-out');
const payBtn = document.querySelector('.receipt__window-btn');
const logo = document.querySelector('.header__timer-extra');

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

payBtn.addEventListener('click', () => location.reload())