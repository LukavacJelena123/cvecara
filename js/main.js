const $ = selektor => document.querySelector(selektor);

const catalog = $('#catalog'),
    shoppingCartContent = $('#cart-content tbody'),
    clearCartBtn = $('#clear-cart');
    // submitAPurchase = $('#submitAPurchase');

let cart = 0;

loadEventListeners();

function loadEventListeners() {
    catalog.addEventListener('click', buyFlower);
    catalog.addEventListener('input', calculateTotal);

    shoppingCartContent.addEventListener('click', removeFlower);
    clearCartBtn.addEventListener('click', clearCart);
    document.addEventListener('DOMContentLoaded', clearCart);
    // submitAPurchase.addEventListener('click',submitingThePurchase);
}

function buyFlower(e) {
    e.preventDefault();
    if (e.target.classList.contains('add-to-cart')) {
        const flower = e.target.parentElement;
        const quantity = e.target.parentElement.querySelector('.productQuantity');
        if (quantity.value < 0 || quantity.value === '') {
            quantity.style.border = '1px solid red';
            quantity.value = '';
            e.target.parentElement.querySelector('.productSum').value = '';
        } else {
            getFlowerInfo(flower);
        }
    }
}

function getFlowerInfo(flower) {
    const flowerInfo = {
        image: flower.querySelector('img').src,
        title: flower.querySelector('h2').textContent,
        price: flower.querySelector('.productPrice').value,
        quantity: parseInt(flower.querySelector('.productQuantity').value),
        productSum: flower.querySelector('.productSum').value,
        cart_id: cart
    }
    addIntoCart(flowerInfo);
}

function calculateTotal(e) {
    let quantity = parseInt(e.target.value),
        price = parseInt(e.target.parentElement.parentElement.querySelector('.productPrice').value),
        productSum = e.target.parentElement.parentElement.querySelector('.productSum');
    e.target.style.border = '2px inset white';
    productSum.value = price * quantity;
}

function addIntoCart(flower) {
    const row = document.createElement('tr');

    row.innerHTML = `
        <tr>
            <td>
                 <img src="${flower.image}" width=90px>
            </td>
            <td>${flower.title}</td>
            <td>${flower.price}</td>
            <td>${flower.quantity}</td>
            <td>${flower.productSum}</td>
            <td>
                <a href="#" class="remove" id="${cart++}">X</a>
            </td>
        </tr>
    `;

    shoppingCartContent.appendChild(row);
    saveIntoStorage(flower)
}

function saveTotalIntoStorage(flowers) {
    let total = 0;
    flowers.forEach(element => {
        total = parseInt(total) + parseInt(element.productSum);
    });
    document.getElementById('total').innerText = `Total: ${total} RSD`;
    sessionStorage.setItem('total', JSON.stringify(total));
}

function saveIntoStorage(flower) {
    let flowers = getFlowerFromStorage();
    flowers.push(flower);
    saveTotalIntoStorage(flowers);
    sessionStorage.setItem('flowers', JSON.stringify(flowers));
}

function getFlowerFromStorage() {
    let flowers;
    if (sessionStorage.getItem('flowers') === null) {
        flowers = [];
    } else {
        flowers = JSON.parse(sessionStorage.getItem('flowers'));
    }
    return flowers;
}


function removeFlower(e) {
    let flower, flowerId;
    if (e.target.classList.contains('remove')) {
        e.target.parentElement.parentElement.remove();
        flower = e.target.parentElement.parentElement;
        flowerId = flower.querySelector('a').getAttribute('id');
        console.log(flowerId);
    }
    removeFlowerFromSessionStorage(flowerId);

}

function removeFlowerFromSessionStorage(id) {
    let flowersLS = getFlowerFromStorage();
    flowersLS.forEach(function (flowerLS, index) {
        if (flowerLS.cart_id == id) {
            flowersLS.splice(index, 1);
        }
    })

    sessionStorage.setItem('flowers', JSON.stringify(flowersLS));
    saveTotalIntoStorage(flowersLS);
}


function clearCart() {
    while (shoppingCartContent.firstChild) {
        shoppingCartContent.removeChild(shoppingCartContent.firstChild);
    }
    clearSessionStorage();
    document.getElementById('total').textContent = '';
}

function clearSessionStorage() {
    sessionStorage.clear();
    cart = 1;
}

function getFromSessionStorage() {
    let flowersLS = getFlowerFromStorage();
    flowersLS.forEach(function (flower) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <tr>
            <td>
                <img src="${flower.image}" width=90px>
            </td>
            <td>${flower.title}</td>
            <td>${flower.price}</td>
            <td>${flower.quantity}</td>
            <td>${flower.productSum}</td>
            <td>
                <a href="#" class="remove" data-id="${flower.id}">X</a>
            </td>
        </tr>
        `;
        shoppingCartContent.appendChild(row);
    })

}
// function submitingThePurchase(){
//     console.log('radi submit');
// }
