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

increaseLvl(0);

btnPlusOrMinus.forEach((btn) => {
    btn.addEventListener('click', function() {
        plusOrMinus(this)
    })
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
    let timeout = setTimeout(() => increaseLvl(lvl), 100)
    // clearInterval(interval);
}

