let main =(function () {

    function init() {
        $catalog.on('click', buyFlower);
        $catalog.on('input', calculateTotal);
        $shoppingCartContent.on('click', removeFlower);
        $clearCartBtn.on('click', clearCart);
        $(document).on('DOMContentLoaded', clearCart);
    }
    const $catalog = $('#catalog'),
    $shoppingCartContent = $('#cart-content tbody'),
    $clearCartBtn = $('#clear-cart');
    let cart = 0;
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
        const row = $('<tr></tr>');
        const { title, price, quantity, image, productSum } = flower;
        $(`    <td>
                 <img src="${image}" width=90px>
            </td>
            <td>${title}</td>
            <td>${price}</td>
            <td>${quantity}</td>
            <td>${productSum}</td>
            <td>
                <a href="#" class="remove" id="${cart++}">X</a>
            </td>
    `).appendTo(row);

        row.appendTo($shoppingCartContent);
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
        clearSessionStorage();
        $shoppingCartContent.html('');
        $('#total').html('');

    }

    function clearSessionStorage() {
        sessionStorage.clear();
        cart = 1;
    }
    
    return {
        init
    }
})();

export default main