var products=[
    {name:'ruza', price: 180, quantity: 100},
    {name:'ljiljan', price: 250, quantity: 100},
    {name:'gerber', price: 305, quantity: 100},
    {name:'karanfil', price: 140, quantity: 100}
];

//petlja koja uzima vrednosti iz promenljive i pravi tabelu
    var wrap=document.getElementById('wrap');

    for (let i = 0; i < products.length; i++) {

       //naziv proizvoda
        var divNaziv=document.createElement('div');
        divNaziv.setAttribute('class','naziv');
        divNaziv.innerHTML=products[i].name;
        wrap.appendChild(divNaziv);



        //kolicina proizvoda
        var divKolicina=document.createElement('div');
        divKolicina.innerHTML='Kolicina:';
        wrap.appendChild(divKolicina);

        var br=document.createElement('br');
        divKolicina.appendChild(br);

        var input=document.createElement('input');
        input.setAttribute('type','number');
        input.setAttribute('class','productQuantity');
        input.setAttribute('oninput','order('+i+')');
        divKolicina.appendChild(input);

        //cena po komadu
        var divKomad=document.createElement('div');
        divKomad.innerHTML='Po komadu:';
        wrap.appendChild(divKomad);

        var br1=document.createElement('br');
        divKomad.appendChild(br1);

        var input1=document.createElement('input');
        input1.setAttribute('type','text');
        input1.setAttribute('class','productPrice');
        input1.setAttribute('value',products[i].price);
        input1.setAttribute('readonly','readonly');
        divKomad.appendChild(input1);

        var span=document.createElement('span');
        span.innerHTML=' dinara';
        input1.appendChild(span);

        //ukupna cena
        var divCena=document.createElement('div');
        divCena.innerHTML='Ukupna cena:';
        wrap.appendChild(divCena);

        var br2=document.createElement('br');
        divCena.appendChild(br2);

        var input2=document.createElement('input');
        input2.setAttribute('type','number');
        input2.setAttribute('class','productSum');
        input2.setAttribute('readonly','readonly');
        divCena.appendChild(input2);

        var span1=document.createElement('span');
        span.innerHTML=' dinara';
        divCena.appendChild(span1);
    }

var quantity=document.getElementsByClassName('productQuantity');
var prodPrice=document.getElementsByClassName('productPrice');
var prodSum=document.getElementsByClassName('productSum');

//f-ja koja uzima vrednost iz input polja i izracunava kolicinu*cenu odredjenog proizvoda
function order(index){
    var itemQuantity=(quantity[index].value==undefined)?0:quantity[index].value-0;
    var itemPrice=(prodPrice[index].value==undefined)?0:prodPrice[index].value-0;
    
    if(!Number.isInteger(itemQuantity)||itemQuantity<=0){
        alert('Niste uneli odgovarajucu vrednost!');
        quantity[index].value=0;
        prodSum[index].value=0;
        orderSum();
    }
    else if(products[index].quantity<itemQuantity){
        alert(`Trenutno je dostupno: ${products[index].name} ${products[index].quantity}`);
        quantity[index].value=products[index].quantity;
        prodSum[index].value=itemPrice*products[index].quantity;
        orderSum();
    }else{
        prodSum[index].value=itemPrice*itemQuantity;
        orderSum();
    }
}

//f-ja koja sabira sve porudzbine zajedno
function orderSum(){
    var sum=document.getElementsByClassName('productSum').length;
    var ordSum=0;
    for (let i = 0; i < sum; i++) {
        if(prodSum[i].value!=undefined){
            ordSum+=(prodSum[i].value-0);
        }      
    }
    document.getElementById('ukupno').value=ordSum;
}


function saveToSessionStorage(){
    sessionStorage.clear();
    var sum=document.getElementsByClassName('productSum').length;
    var ordSum=0;
    for (let i = 0; i < sum; i++) {
        var prod={name:true};
        if(prodSum[i].value>0){
            ordSum+=(prodSum[i].value-0);
            prod['name']=products[i].name;
            prod['quantity']=quantity[i].value;
            prod['price']=prodSum[i].value;
            sessionStorage.setItem('ID'+i,JSON.stringify(prod));
        }
        sessionStorage.setItem('order',JSON.stringify(ordSum));
    }
}
