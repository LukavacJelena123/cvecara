let flower = (function(){

    const arr = [];
    let $catalog = $('#catalog');
    
    class Flower {
        constructor(name,price,quantity,img){
            this.name = name,
            this.price = price,
            this.quantity = quantity,
            this.img = img
        }
    }
    
    
    function addToCatalog(name,price,quantity,img){
        const flower = new Flower(name,price,quantity,img);
        arr.push(flower);
        createCatalog();
    }
    
    function createCatalog(){
        $catalog.html('');
        arr.forEach(function(element) {
        const {img,name,price} = element;
    
         let $flower = $(`<div class = 'flower'>
                            <img src = ${img} alt='${name}-img'>
                            <div><h2>${name}</h2></div>
                            <div>price(RSD)<input type = 'text' class = 'productPrice' value = '${price}' readonly></div>
                            <div>quantity: <input type = 'number' class = 'productQuantity' min = '0'></div>
                            <div>total price(RSD): <input type = 'number' class = 'productSum' readonly></div>
                            <button type = 'submit' class = 'add-to-cart' id = '${name}'>add to cart</button>
                        </div>`);
        $flower.appendTo($catalog);
    });
    }
        return {
            addToCatalog
        }
    
    })();
    
    export default flower;
    
    