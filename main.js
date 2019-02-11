var ruza=100;
var ljiljan=100;
var gerber=100;
var flowers=[ruza,ljiljan,gerber];
var flowerName=['ruza','ljiljan','gerber'];

var quantity=document.getElementsByClassName('productQuantity');
var prodSum=document.getElementsByClassName('productSum');
var prodPrice=document.getElementsByClassName('productPrice');


function order(a){
    let aa=(quantity[a].value==undefined)?0:quantity[a].value-0;
    let b=(prodPrice[a].value==undefined)?0:prodPrice[a].value-0;
    if(!Number.isInteger(aa)||aa<=0){
        alert('Niste uneli odgovarajucu vrednost!');
        quantity[a].value=0;
        prodSum[a].value=0;
        orderSum();
    }else if(flowers[a]<aa){
        alert(`Trenutno je dostupno: ${flowerName[a]} ${flowers[a]}  komada`);
        quantity[a].value=flowers[a];
        prodSum[a].value=flowers[a]*b;
    }else{
    prodSum[a].value=aa*b;
    orderSum();
    }
 }

//f-ja koja izracunava pojedinacnu porudzbinu i poziva f-ju koja sabira sve porudzbine zajedno
 function order(a){
    let aa=(quantity[a].value==undefined)?0:quantity[a].value-0;
    let b=(prodPrice[a].value==undefined)?0:prodPrice[a].value-0;
    if(!Number.isInteger(aa)||aa<=0){
        alert('Niste uneli odgovarajucu vrednost!');
        quantity[a].value=0;
        prodSum[a].value=0;
        orderSum();
    }else if(flowers[a]<aa){
        alert(`Trenutno je dostupno: ${flowerName[a]} ${flowers[a]}  komada`);
        quantity[a].value=flowers[a];
        prodSum[a].value=flowers[a]*b;
    }else{
    prodSum[a].value=aa*b;
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

//f-ja koja cuva podatke u Local-Stor.
function saveToLocalStorage(){
    var sum=document.getElementsByClassName('productSum').length;
    var ordSum=0;
    var str="";
    for (let i = 0; i < sum; i++) {
        if(prodSum[i].value>0){
            ordSum+=(prodSum[i].value-0);
            str+=`${flowerName[i]}:${quantity[i].value},cena:${prodSum[i].value};`;
        } 
    }
    str+=`ukupno: ${ordSum}`;
    window.localStorage.setItem('order',str);
}

