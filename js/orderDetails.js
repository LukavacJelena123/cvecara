(function () {

    const $shoppCartCont = $('#cart-contentTable tbody'),
          delivery = $('#delivery');
          
    delivery.on('input', userInputs);

    $(document).on('DOMContentLoaded', function () {
        getFromSessionStorage();
        getFormElements();
        registerInputsEvents();
    });
    function getFlowerFromStorage() {
        let flowers;
        if (sessionStorage.getItem('flowers') === null) {
            flowers = [];
        } else {
            flowers = JSON.parse(sessionStorage.getItem('flowers'));
        }
        return flowers;
    }

    function getTotalFromLocalStorage() {
        let total;
        if (sessionStorage.getItem('total') === null) {
            total = '';
        } else {
            total = JSON.parse(sessionStorage.getItem('total'));
        }
        return total;
    }

    function getFromSessionStorage() {
        let flowersLS = getFlowerFromStorage();
        let total = getTotalFromLocalStorage();
        flowersLS.forEach(function (flower) {
            const { title, price, quantity, image, productSum } = flower;
            const row = $('<tr></tr>');
            $(`
            <td>
                <img src="${image}" width=90px>
            </td>
            <td>${title}</td>
            <td>${price}</td>
            <td>${quantity}</td>
            <td>${productSum}rsd</td>
        `).appendTo(row);
            row.appendTo($shoppCartCont);
        })
        $('#total').text(`Total account: ${total} RSD`);
    }

    const RegExps = {
        firstName: /^[A-ZŠĐŽĆČ][a-zšđčćž]{1,11}\s?([A-ZŠĐŽĆČ][a-zšđčćž]{1,11})?$/,
        lastName: /^[A-ZŠĐŽĆČ][a-zšđčćž]{1,11}\s?([A-ZŠĐŽĆČ][a-zšđčćž]{1,11})?$/,
        address: /^[A-ZŠĐŽĆČ][a-zšđčćž]{1,20}\s?([A-ZŠĐŽĆČa-zšđčćž][a-zšđčćž]{1,11})?\s\d{1,3}$/,
        city: /^[A-ZŠĐŽĆČ][a-zšđčćž]{1,11}$/,
        postalCode: /^[1-9]\d{4}$/,
        phone: /^\d{3}\/(\d{3}-?\d{4}|\d{4}-?\d{3})$/,
        email: /^[a-zšđčćž\-.]{3,}@[a-zšđčćž]{3,}.[a-zšđčćž]{2,3}$/
    }

    const formElements = {};

    function getFormElements() {
        formElements.form = document.getElementById('forma');
        formElements.tbody = formElements.form.querySelector('tbody');
        for (tr of formElements.tbody.rows) {
            var input = tr.querySelector('input');
            formElements[input.id] = input;
        }
    }
    function testInput(e) {
        let test = RegExps[e.target.id].test(e.target.value);
        if (!test) {
            formElements[e.target.id].style.borderBottom = '2px solid red';
        } else {
            formElements[e.target.id].style.borderBottom = '2px solid green';
        }
    }
    function registerInputsEvents(e) {
        formElements.form.addEventListener('input', testInput);
    }

    function userInputs(e) {
        const check = e.target;
        switch (check.id) {
            case 'express': expressDelivery(check);
                break;
            case 'date': checkDate(check);
                break;
            case 'online': checkAccount(check);
                break;
            case 'payOnDelivery': {
                document.getElementById('acc').style.display = 'none';
                break;
            }
        }
    }

    function expressDelivery(check) {
        let total = getTotalFromLocalStorage();
        let toPay = document.getElementById('toPay');
        if (check.checked) {
            toPay.style.display = 'block';
            toPay.textContent = `Total to pay: ${total + 300} RSD`;
        } else {
            toPay.style.display = 'none';
        }
    }

    function checkDate(check) {
        const today = new Date();
        let day = (check.value).split('-');
        const deliveryDay = new Date(day[0], day[1] - 1, day[2]);
        if (today > deliveryDay) {
            document.getElementById('date').style.border = '2px solid red';
        } else {
            document.getElementById('date').style.border = '2px inset white';
        }
    }

    function checkAccount() {
        const acc = document.getElementById('acc')
        acc.style.display = 'block';
        acc.addEventListener('input', testAccount);
    }
    function testAccount(e) {
        const acc = document.getElementById('account');
        const accountNoRegEx = /^(\d{4}-){3}\d{4}$/;
        let test = accountNoRegEx.test(e.target.value);
        if (!test) {
            acc.style.borderBottom = '2px solid red';
        } else {
            acc.style.borderBottom = '2px solid green';
        }
    }
})();