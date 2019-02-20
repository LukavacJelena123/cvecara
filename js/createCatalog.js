class Flower {
    constructor(name,price,quantity,img){
        this.name = name,
        this.price = price,
        this.quantity = quantity,
        this.img = img
    }
}
const rose = new Flower('Rose',180,100,'img/ruza-bela-mala.jpg');
const orris = new Flower('Orris',230,100,'img/iris-mali.jpg');
const gerber = new Flower('Gerber',120,100,'img/gerber-mali.jpg');
const roseRed = new Flower('Rose - red',190,100,'img/ruza.jpg');
const flower_de_luce = new Flower('Flower de luce',175,100,'img/perunika-mala.jpg');
const carnation = new Flower('Carnation',120,100,'img/karanfil.jpg');
const orchid = new Flower('Orchid',320,100,'img/orhid.jpg');
const tulip = new Flower('Tulip',120,100,'img/lala.jpg');
const cactus = new Flower('Cactus',190,100,'img/kaktusi.jpg');
const perunica = new Flower('Perunica',120,100,'img/perunika-mala.jpg');
const amaryllis = new Flower('Amaryllis',350,100,'img/crveno.jpg');
const daisy = new Flower('Daisy',90,100,'img/daisy.jpg');
const arr = [rose,orris,gerber,roseRed,flower_de_luce,carnation,orchid,tulip,cactus,perunica,amaryllis,daisy];

function addToCatalog(flower){
    arr.push(flower);
}

function createCatalog(){
    arr.forEach(function(element) {
    
    let divFlower = document.createElement('div');
    divFlower.setAttribute('class','flower');
    
    let divImg = document.createElement('div');
    
    let img = document.createElement('img');
    img.setAttribute('src',element.img);
    img.setAttribute('alt',`${element.name}-img`);
    divImg.appendChild(img);
    divFlower.appendChild(divImg);

    let divH2 = document.createElement('div');
    let h2 = document.createElement('h2');
    h2.textContent = `${element.name}`;
    divH2.appendChild(h2);
    divFlower.appendChild(divH2);

    let divPrice = document.createElement('div');
    divPrice.textContent = 'price(RSD): '
    let inputPrice = document.createElement('input');
    inputPrice.setAttribute('type','text');
    inputPrice.setAttribute('class','productPrice');
    inputPrice.setAttribute('value',`${element.price}`);
    inputPrice.setAttribute('readonly','readonly');
    divPrice.appendChild(inputPrice);
    divFlower.appendChild(divPrice);
   
    let divQuantity = document.createElement('div');
    divQuantity.textContent = 'quantity: ';
    let inputQuantity = document.createElement('input');
    inputQuantity.setAttribute('type','number');
    inputQuantity.setAttribute('class','productQuantity');
    inputQuantity.setAttribute('min','0');
    divQuantity.appendChild(inputQuantity);
    divFlower.appendChild(divQuantity);
 
    let divTotal = document.createElement('div');
    divTotal.textContent = 'total price(RSD): ';
    let inputTotal = document.createElement('input');
    inputTotal.setAttribute('type','number');
    inputTotal.setAttribute('class','productSum');
    inputTotal.setAttribute('readonly','readonly');
    divTotal.appendChild(inputTotal);
    divFlower.appendChild(divTotal);

    let btn = document.createElement('button');
    btn.setAttribute('type','submit');
    btn.setAttribute('class','add-to-cart');
    btn.setAttribute('id',`${element.name}`);
    btn.textContent = 'add to chart';
    divFlower.appendChild(btn);

    catalog.appendChild(divFlower);
});
}
createCatalog();